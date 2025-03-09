import dbConnect from '../../lib/dbConnect.js';
import User from '../../models/User';
import cors from '../../lib/cors.js';

export default async function handler(req, res) {
  await cors(req, res, () => {}); 

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await dbConnect();
    const { orderId, userId } = req.body;
    console.log(orderId)
    console.log(userId)

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const order = user.orders.id(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.isNew1 = false;
    await user.save();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
