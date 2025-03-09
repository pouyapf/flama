import User from '../../models/User.js';
import dbConnect from '../../lib/dbConnect.js';
import cors from '../../lib/cors.js';
export default async function handler(req, res) {
    await cors(req, res, () => {});

    const secretKey = req.headers['x-secret-key'];
    if (!secretKey || secretKey !== process.env.SECRET_KEY) {
      return res.status(403).json({ error: 'Forbidden' });
    }
  await dbConnect();

  const { chatidinitial } = req.query;

  try {
    const user = await User.findOne({ 'orders._id': chatidinitial });
    const order = user.orders.id(chatidinitial);

    res.status(200).json({ isopen: order.contact, messages: order.contact.messages });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}
