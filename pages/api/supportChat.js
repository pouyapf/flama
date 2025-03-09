import User from '../../models/User';
import dbConnect from '../../lib/dbConnect.js';


export default async function handler(req, res) {


  await dbConnect();
  
  if (req.method === 'POST') {
    const { userId, sender, message, role } = req.body;

    try {
      const user = await User.findById(userId);
    

      if (!order.contact) {
        order.contact = { isnewsup: true, isopensup: true, messages: [] };
      }

      order.contact.messages.push({ sender,role, message });

      await user.save();

      res.status(200).json({ success: true, contact: order.contact });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
