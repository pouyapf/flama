import mongoose from 'mongoose';
import User from '../../models/User';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import MelipayamakApi from 'melipayamak';
import cors from '../../lib/cors';

const LIARA_ENDPOINT = process.env.LIARA_ENDPOINT;
const LIARA_BUCKET_NAME = process.env.LIARA_BUCKET_NAME;
const LIARA_ACCESS_KEY = process.env.LIARA_ACCESS_KEY;
const LIARA_SECRET_KEY = process.env.LIARA_SECRET_KEY;

const s3 = new S3Client({
  region: 'default',
  endpoint: LIARA_ENDPOINT,
  credentials: {
    accessKeyId: LIARA_ACCESS_KEY,
    secretAccessKey: LIARA_SECRET_KEY,
  },
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const ensureDirExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const uploadFile = async (file) => {
  const fileStream = fs.createReadStream(file.filepath);
  const params = {
    Bucket: LIARA_BUCKET_NAME,
    Key: `company/${path.basename(file.filepath)}`,
    Body: fileStream,
  };

  try {
    await s3.send(new PutObjectCommand(params));
    return `https://${LIARA_BUCKET_NAME}.${new URL(LIARA_ENDPOINT).hostname}/company/${path.basename(file.filepath)}`;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Error uploading file');
  }
};

const handler = async (req, res) => {
  try {
    await cors(req, res, () => {});

    const secretKey = req.headers['x-secret-key'];
    if (!secretKey || secretKey !== process.env.SECRET_KEY) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    if (req.method === 'POST') {
      ensureDirExists('./uploads');
      const form = formidable({ multiples: true, uploadDir: './uploads', keepExtensions: true });

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error('Error parsing form:', err);
          return res.status(500).json({ error: 'Error parsing form' });
        }

        const imageUrls = [];
        if (files.images) {
          const fileArray = Array.isArray(files.images) ? files.images : [files.images];
          for (const file of fileArray) {
            const url = await uploadFile(file);
            imageUrls.push(url);
          }
        }

        const { items, totalPrice, planName, description, email } = fields;
        const total = parseFloat(totalPrice);

        const order = {
          items: items ? JSON.parse(items) : [],
          totalPrice: total,
          planName: planName ? planName.toString() : '',
          description: description ? description.toString() : '',
          currentStage: 0,
          imageUrls,
          payout1: {
            price: total * 0.2,
            status: false,
            details: [],
          },
          payout2: {
            price: total * 0.3,
            status: false,
            details: [],
          },
          payout3: {
            price: total * 0.5,
            status: false,
            details: [],
          },
        };
        const username = process.env.MELIPAYAMAK_User;
        const password = process.env.MELIPAYAMAK_Pass;
        const melipayamak = new MelipayamakApi(username, password);
        const sms = melipayamak.sms();
        let message = 'سفارش شما در مرحله ی ارتباط با کارشناس قرار گرفت .لطفا منتظر تماس کارشناس باشید';

        try {
          const user = await User.findOne({ email: email || '' });
          if (user) {
            user.orders = user.orders || [];
            user.orders.push(order);
            await user.save();
            await sms.send(user.number.toString(), '50002710013565', message)
            .then(response => {
              console.log('SMS sent successfully', response);
            })
            res.status(201).json({ message: 'Order submitted successfully' });
          } else {
            res.status(404).json({ message: 'User not found' });
          }
        } catch (error) {
          console.error('Error saving order:', error);
          res.status(500).json({ error: 'Error saving order' });
        }
      });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

export default handler;
