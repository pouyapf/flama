import ZarinpalCheckout from 'zarinpal-checkout';
import mongoose from 'mongoose';
import User from '../../../models/User';

export default async function handler(req, res) {
  const { Authority, Status } = req.query;

  const zarinpal = ZarinpalCheckout.create(process.env.ZARINPAL_MERCHANT_ID, false);

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const user = await User.findOne({ 
      $or: [
        { 'orders.payout1.details.authority': Authority },
        { 'orders.payout2.details.authority': Authority },
        { 'orders.payout3.details.authority': Authority }
      ]
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    let order, payoutField, payoutDetail;

    user.orders.forEach((ord) => {
      ord.payout1.details.forEach((detail) => {
        if (detail.authority === Authority) {
          order = ord;
          payoutField = 'payout1';
          payoutDetail = detail;
        }
      });
      ord.payout2.details.forEach((detail) => {
        if (detail.authority === Authority) {
          order = ord;
          payoutField = 'payout2';
          payoutDetail = detail;
        }
      });
      ord.payout3.details.forEach((detail) => {
        if (detail.authority === Authority) {
          order = ord;
          payoutField = 'payout3';
          payoutDetail = detail;
        }
      });
    });

    if (!order || !payoutDetail) {
      res.status(404).json({ message: 'Order or payout detail not found' });
      return;
    }

    const amount = payoutDetail.amount;

    const response = await zarinpal.PaymentVerification({
      Amount: amount,
      Authority: Authority
    });

    payoutDetail.trackingCode = generateTrackingCode(); // Assign tracking code to the transaction
    payoutDetail.paymentId = Authority; // Store the شناسه پرداخت in the database

    if (response.status === 100) {
      payoutDetail.status = 'Verified';
      order[payoutField].status = true;
      order.inprogress = true;
      await user.save();
      res.redirect(`/payment-success?trackingCode=${payoutDetail.trackingCode}`);
    } else {
      payoutDetail.status = 'Failed'; // Mark the payment as failed
      await user.save();
      res.redirect(`/payment-failed?trackingCode=${payoutDetail.trackingCode}`);
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.redirect('/payment-failed');
  } finally {
    mongoose.connection.close();
  }
}

// Function to generate a unique tracking code
function generateTrackingCode() {
  return Math.random().toString(36).substr(2, 9).toUpperCase();
}
