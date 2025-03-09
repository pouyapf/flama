// pages/api/get-all-users.js
import clientPromise from '../../lib/mongodb';
import cors from '../../lib/cors';

async function getAllUsers() {
  const client = await clientPromise;
  const db = client.db("test");

  const users = await db.collection('users').find().toArray();
  return users;
}

export default async function handler(req, res) {
  cors(req, res, async () => {
    if (req.method !== 'GET') {
      return res.status(405).end(); // Method Not Allowed
    }

    const secretKey = req.headers['x-secret-key'];
    if (!secretKey || secretKey !== process.env.SECRET_KEY) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    try {
      const users = await getAllUsers();
      res.status(200).json({ users });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
  });
}
