
import dbConnect from '../../../lib/dbConnect.js.js';
import User from '../../../models/User.js';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const { token } = req.query;

    try {
      const user = await User.findOne({ verificationToken: token });

      if (!user) {
        return res.status(400).json({ message: 'Invalid token' });
      }

      user.isVerified = true;
      user.verificationToken = undefined; // Remove the token after verification
      user.verificationTokenSentAt = undefined; // Remove the token timestamp
      await user.save();

      res.status(200).json({ message: 'ایمیل تایید شد' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
