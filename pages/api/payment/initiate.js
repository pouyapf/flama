import ZarinpalCheckout from 'zarinpal-checkout';
import User from '../../../models/User';
import mongoose from 'mongoose';
import cors from '../../../lib/cors';

export default async function handler(req, res) {
  await cors(req, res, () => {});
  const secretKey = req.headers['x-secret-key'];
  if (!secretKey || secretKey !== process.env.SECRET_KEY) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const { amount, description, email, mobile, orderId, payout } = req.body;
  const zarinpal = ZarinpalCheckout.create(process.env.ZARINPAL_MERCHANT_ID, false);

  try {
    const response = await zarinpal.PaymentRequest({
      Amount: amount, // In Tomans
      CallbackURL: 'https://flama.ir/api/payment/verify', // Ensure this is correct
      Description: description,
      Email: email,
      Mobile: mobile,
    });

    if (response.status === 100) {
      console.log(response)
      await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

      const user = await User.findOne({ email });

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      const order = user.orders.id(orderId);

      if (!order) {
        res.status(404).json({ message: 'Order not found' });
        return;
      }

      const payoutDetail = {
        authority: response.authority,
        status: 'Failed',
        amount,
        date: new Date(),
        trackingCode: generateTrackingCode(), // Generate a unique tracking code
      };

      if (payout === 'payout1') {
        order.payout1.details.push(payoutDetail);
      } else if (payout === 'payout2') {
        order.payout2.details.push(payoutDetail);
      } else if (payout === 'payout3') {
        order.payout3.details.push(payoutDetail);
      } else {
        res.status(400).json({ message: 'Invalid payout type' });
        return;
      }

      await user.save();
      res.status(200).json({ url: response.url, authority: response.authority });
    } else {
      res.status(400).json({ message: 'Payment initiation failed', response });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  } finally {
    mongoose.connection.close();
  }
}

// Function to generate a unique tracking code
function generateTrackingCode() {
  return Math.random().toString(36).substr(2, 9).toUpperCase();
}
