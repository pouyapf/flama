import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../models/User';
import FailedAttempt from '../../../models/FailedAttempt';
import dbConnect from '../../../lib/dbConnect.js';
import bcrypt from 'bcrypt';
import requestIp from 'request-ip';
import { sendResetPasswordEmail, resetPassword } from '../../../utils/passwordReset';
import validateResetToken from '../../../pages/api/auth/validate-reset-token';

const MAX_ATTEMPTS = 5;
const BAN_DURATION = 30 * 60 * 1000; // 30 minutes

export default async function auth(req, res) {
  if (req.method === 'POST' && req.query.nextauth.includes('request-reset')) {
    return sendResetPasswordEmail(req, res);
  }
  if (req.method === 'POST' && req.query.nextauth.includes('reset-password')) {
    return resetPassword(req, res);
  }
  if (req.method === 'POST' && req.query.nextauth.includes('validate-reset-token')) {
    return validateResetToken(req, res);
  }

  return NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          await dbConnect();
          
          const ip = requestIp.getClientIp(req);
          const currentTime = Date.now();

          // Fetch the failed attempt record for the IP address
          let failedAttempt = await FailedAttempt.findOne({ ip });

          if (failedAttempt) {
            const { attempts, firstAttempt } = failedAttempt;

            if (attempts >= MAX_ATTEMPTS) {
              const timeSinceFirstAttempt = currentTime - new Date(firstAttempt).getTime();
              if (timeSinceFirstAttempt < BAN_DURATION) {
                throw new Error(`آیپی شما موقتا بن شد لطفا  ${Math.ceil((BAN_DURATION - timeSinceFirstAttempt) / 1000 / 60)} دقیقه ی دیگر مجددا تلاش کنید`);
              } else {
                // Reset failed attempts after ban duration
                failedAttempt.attempts = 0;
                failedAttempt.firstAttempt = currentTime;
                await failedAttempt.save();
              }
            }
          }

          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            if (!failedAttempt) {
              failedAttempt = new FailedAttempt({ ip, attempts: 1, firstAttempt: currentTime });
            } else {
              failedAttempt.attempts += 1;
              if (failedAttempt.attempts === 1) {
                failedAttempt.firstAttempt = currentTime;
              }
            }
            await failedAttempt.save();
            throw new Error('ایمیل یا نام کاربری اشتباه است');
          }

          if (!user.isVerified) {
            throw new Error('ایمیل تایید نشده است');
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordValid) {
            if (!failedAttempt) {
              failedAttempt = new FailedAttempt({ ip, attempts: 1, firstAttempt: currentTime });
            } else {
              failedAttempt.attempts += 1;
              if (failedAttempt.attempts === 1) {
                failedAttempt.firstAttempt = currentTime;
              }
            }
            await failedAttempt.save();
            throw new Error('Invalid email or password');
          }

          // Reset failed attempts on successful login
          if (failedAttempt) {
            await FailedAttempt.deleteOne({ ip });
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            number: user.number,
            isAdmin: user.isAdmin,
          };
        }
      })
    ],
    pages: {
      signIn: '/auth/login',
      error: '/auth/error'
    },
    session: {
      jwt: true,
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.name = user.name;
          token.email = user.email;
          token.number = user.number;
          token.isAdmin = user.isAdmin;
        }
        return token;
      },
      async session({ session, token }) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.number = token.number;
        session.user.isAdmin = token.isAdmin;
        return session;
      }
    },
    secret: process.env.NEXTAUTH_SECRET,
  });
}
