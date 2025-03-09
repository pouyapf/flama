import clientPromise from '../../lib/mongodb';
import cors from '../../lib/cors';

async function getUserByEmail(email) {
  const client = await clientPromise;
  const db = client.db("test");

  const user = await db.collection('users').findOne({ email });
  if (!user) {
    throw new Error('User not found for email: ' + email);
  }

  return user;
}

export default async function handler(req, res) {
  cors(req, res, async () => {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    const secretKey = req.headers['x-secret-key'];
    if (!secretKey || secretKey !== process.env.SECRET_KEY) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const { userEmail } = req.query;

    if (!userEmail) {
      return res.status(400).json({ message: 'Missing user email.' });
    }

    try {
      const user = await getUserByEmail(userEmail);
      res.status(200).json({ user });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
  });
}
