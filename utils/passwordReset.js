import User from '../models/User';
import dbConnect from '../lib/dbConnect.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

export async function sendResetPasswordEmail(req, res) {
    await dbConnect();
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'کاربر یافت نشد' });
    }
  
    // Check if a token was sent in the last 15 minutes
    if (user.verificationTokenSentAt && (Date.now() - user.verificationTokenSentAt) < 900000) { // 15 minutes
      return res.status(429).json({ message: 'ایمیل بازیابی رمز عبور اخیراً ارسال شده است. لطفاً صبر کنید.' });
    }
  
    const token = crypto.randomBytes(20).toString('hex');
    user.verificationToken = token;
    user.verificationTokenSentAt = Date.now();
    await user.save();
  
    const resetURL = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: 'بازیابی رمز عبور',
      text: `شما این ایمیل را دریافت کرده‌اید زیرا درخواست بازیابی رمز عبور برای حساب شما ثبت شده است.\n\n
      لطفاً روی لینک زیر کلیک کنید یا آن را در مرورگر خود کپی کنید تا فرایند را تکمیل کنید:\n\n
      ${resetURL}\n\n
      اگر این درخواست را شما ارسال نکرده‌اید، لطفاً این ایمیل را نادیده بگیرید و رمز عبور شما تغییر نخواهد کرد.\n`,
    };
  
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error('خطایی رخ داده است:', err);
        return res.status(500).json({ message: 'خطا در ارسال ایمیل' });
      }
      res.status(200).json({ message: 'ایمیل بازیابی رمز عبور ارسال شد' });
    });
  }
  export async function resetPassword(req, res) {
    await dbConnect();
    const { token, password } = req.body;
    const user = await User.findOne({ verificationToken: token });
    if (!user || (Date.now() - user.verificationTokenSentAt) >= 3600000) { // 1 hour
      return res.status(400).json({ message: 'توکن نامعتبر است یا منقضی شده است' });
    }
  
    user.password = bcrypt.hashSync(password, 10);
    user.verificationToken = undefined;
    user.verificationTokenSentAt = undefined;
    await user.save();
    res.status(200).json({ message: 'بازیابی رمز عبور با موفقیت انجام شد' });
  }
  
