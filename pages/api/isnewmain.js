import User from '../../models/User';
import cors from '../../lib/cors';
import dbConnect from '../../lib/dbConnect.js';
export default async function handler(req, res) {
  try {
    await cors(req, res, () => {}); // Wait for CORS to resolve

    
    const secretKey = req.headers['x-secret-key'];
    if (!secretKey || secretKey !== process.env.SECRET_KEY) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await dbConnect();
    const usersWithNewOrders = await User.find({ 'orders.isNew1': true });

    if (usersWithNewOrders.length > 0) {
      res.status(200).json({ hasNewOrders: true });
    } else {
      res.status(200).json({ hasNewOrders: false });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
