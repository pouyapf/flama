import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
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
    Key: `blog/${path.basename(file.filepath)}`,
    Body: fileStream,
  };

  try {
    await s3.send(new PutObjectCommand(params));
    return `https://${LIARA_BUCKET_NAME}.${new URL(LIARA_ENDPOINT).hostname}/blog/${path.basename(file.filepath)}`;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Error uploading file');
  }
};

const handler = async (req, res) => {

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
      if (files.file) {
        const fileArray = Array.isArray(files.file) ? files.file : [files.file];
        for (const file of fileArray) {
          try {
            const url = await uploadFile(file);
            imageUrls.push(url);
          } catch (error) {
            console.error('Error uploading file:', error);
            return res.status(500).json({ error: 'Error uploading file' });
          }
        }
      }

      res.status(200).json({ url: imageUrls });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
