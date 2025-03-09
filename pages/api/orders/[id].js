import clientPromise from '../../../lib/mongodb';
import cors from '../../../lib/cors';
import { ObjectId } from 'mongodb';

const handler = async (req, res) => {
  try {
    await cors(req, res, () => {});  // Passing an empty function as next

    const secretKey = req.headers['x-secret-key'];
    if (!secretKey || secretKey !== process.env.SECRET_KEY) {
      return res.status(403).json({ error: 'Forbidden' });
    }


    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const { id } = req.query;

    const client = await clientPromise;
    const db = client.db("test");

    const order = await db.collection('users').findOne(
      { 'orders._id': new ObjectId(id) },
      { projection: { 'orders.$': 1, email: 1, name: 1, number: 1 } }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const response = {
      ...order.orders[0],
      email: order.email,
      name: order.name,
      number: order.number,
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

export default handler;