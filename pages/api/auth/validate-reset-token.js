import User from '../../../models/User';
import dbConnect from '../../../lib/dbConnect.js';

export default async function handler(req, res) {
  await dbConnect();

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ valid: false });
  }

  const user = await User.findOne({ verificationToken: token });

  if (!user || !token) {
    return res.status(400).json({ valid: false });
  }

  return res.status(200).json({ valid: true });
}
