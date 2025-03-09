import nodemailer from 'nodemailer';
import crypto from 'crypto';
import dbConnect from '../../../lib/dbConnect.js';
import User from '../../../models/User';
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { name, email, password, number } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'کاربر قبلاً ثبت نام کرده است' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenSentAt = Date.now();

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      number,
      verificationToken,
      verificationTokenSentAt,
    });

    await user.save();

    // Send verification email using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'تایید ایمیل',
      text: `روی این لینک کلیک کنید تا ایمیل خود را تایید کنید: ${process.env.NEXTAUTH_URL}/auth/verify?token=${verificationToken}`,
    };

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error('خطا در ارسال ایمیل:', err);
        return res.status(500).json({ message: 'خطا در ارسال ایمیل' });
      }
      res.status(201).json({ message: 'کاربر ثبت نام شد، لطفاً ایمیل خود را تایید کنید' });
    });
  } else {
    res.status(405).json({ message: 'متد مجاز نمی‌باشد' });
  }
}
