import MelipayamakApi from 'melipayamak';
import clientPromise from '../../lib/mongodb';
import mongoose from 'mongoose';
import User from '../../models/User';
import cors from '../../lib/cors';

export default async function handler(req, res) {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { userNumber, orderid, buttonId } = req.body;
    const secretKey = req.headers['x-secret-key'];

    if (!secretKey || secretKey !== process.env.SECRET_KEY) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    if (!userNumber || !orderid || !buttonId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const username = process.env.MELIPAYAMAK_User;
    const password = process.env.MELIPAYAMAK_Pass;
    const melipayamak = new MelipayamakApi(username, password);
    const sms = melipayamak.sms();
    let message = '';
    let currentStage = 0;

    switch (buttonId) {
      case 1:
        message = 'با سلام، سفارش شما در مرحله ی پرداخت اول قرار گرفت ،لطفا به پنل خود مراجعه فرمایید.لغو 11 ';
        currentStage = 1;
        break;
      case 2:
        message = 'با سلام، سفارش شما در مرحله ی پرداخت دوم قرار گرفت ،لطفا به پنل خود مراجعه فرمایید.لغو 11 ';
        currentStage = 2;
        break;
      case 3:
        message = 'با سلام، سفارش شما در مرحله ی پرداخت نهایی قرار گرفت ،لطفا به پنل خود مراجعه فرمایید.لغو 11 ';
        currentStage = 3;
        break;
      default:
        return res.status(400).json({ error: 'Invalid buttonId' });
    }

    try {
      const client = await clientPromise;
      const db = client.db("test");

      const user = await db.collection('users').findOne({ number: userNumber.toString() });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await sms.send(userNumber.toString(), '50002710013565', message)
        .then(response => {
          console.log('SMS sent successfully', response);
        })
        .catch(err => {
          return res.status(500).json({ error: 'Error sending SMS' });
        });

      const result = await db.collection('users').updateOne(
        { number: userNumber.toString(), 'orders._id': new mongoose.Types.ObjectId(orderid) },
        { $set: { 'orders.$.currentStage': currentStage, 'orders.$.inprogress': false } }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.status(200).json({ message: 'SMS sent and order updated' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
}
