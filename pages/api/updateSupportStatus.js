import mongoose from 'mongoose';
import User from '../../models/User';
import cors from '../../lib/cors';

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req, res) {
  await cors(req, res, () => {});

  const secretKey = req.headers['x-secret-key'];
  if (!secretKey || secretKey !== process.env.SECRET_KEY) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests are allowed' });
  }

  const { userId, orderId } = req.body;

  if (!userId || !orderId) {
    return res.status(400).send({ message: 'Missing userId or orderId' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const order = user.orders.id(orderId);
    if (!order) {
      return res.status(404).send({ message: 'Order not found' });
    }

    order.contact.isopensup = false;
    await user.save();

    return res.status(200).send({ message: 'Support status updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
}
