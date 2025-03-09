import dbConnect from '../../lib/dbConnect.js';
import BlogPost from '../../models/BlogPost';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import cors from '../../lib/cors.js';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

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
  try {

    await cors(req, res, () => {});

    const secretKey = req.headers['x-secret-key'];
    if (!secretKey || secretKey !== process.env.SECRET_KEY) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await dbConnect();

    if (req.method === 'POST') {
      ensureDirExists('./uploads');
      const form = formidable({ multiples: false, uploadDir: './uploads', keepExtensions: true });

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error('Error parsing form:', err);
          return res.status(500).json({ error: 'Error parsing form' });
        }

        const { title, content, summary, categories } = fields;
        console.log("asdadaadasdasdadadad", content[0]);

        // Check if the title already exists
        const existingPost = await BlogPost.findOne({ title });
        if (existingPost) {
          return res.status(400).json({ message: 'A post with this title already exists.' });
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

        try {
          const newPost = new BlogPost({
            summary: summary[0],
            title: title[0],
            content: content[0],
            mainImage: imageUrls[0],
            categories: categories ? JSON.parse(categories).map(name => ({ name })) : [],
          });

          await newPost.save();
          return res.status(201).json({ success: true, data: newPost });
        } catch (error) {
          console.error('Error saving post:', error);
          return res.status(400).json({ success: false, message: error.message });
        }
      });
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
