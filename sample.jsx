









// /pages/api/blogimageupload.js
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
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
  if (req.method === 'POST') {
    ensureDirExists('./uploads');
    const form = formidable({ multiples: true, uploadDir: './uploads', keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        return res.status(500).json({ error: 'Error parsing form' });
      }

      console.log('Fields:', fields);
      console.log('Files:', files);

      const imageUrls = [];
      if (files.file) {
        const fileArray = Array.isArray(files.file) ? files.file : [files.file];
        for (const file of fileArray) {
          try {
            const url = await uploadFile(file);
            imageUrls.push(url);
          } catch (error) {
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










const username = process.env.MELIPAYAMAK_User;
const password = process.env.MELIPAYAMAK_Pass;
const melipayamak = new MelipayamakApi(username,password);
const sms = melipayamak.sms();


await sms.send(userNumber,'50002710013565',message).then(res=>{
  //RecId or Error Number 
}).catch(err=>{
  //
})




<div className=' flex justify-center   items-end relative flex-row-reverse'>


         <div className={`  ${navstatedeck ? ('w-28 visible opacity-100 '):(' invisible opacity-0  w-0 h-0 ')} 
         border border-solid border-greenidea rounded-md  
           p-2 gap-4 flex flex-col justify-start items-start  top-8 right-7 absolute   bg-backgr`}>



        <Link href={'/dashboard'} className='flex text-greybtn items-center flex-row-reverse justify-center gap-2 rounded-md shadow-md hover:text-white'><span>پنل کاربری</span><RiDashboardHorizontalFill /></Link>
        <div className='cursor-pointer hover:text-white flex gap-2 justify-center items-center'><AiOutlineLogout onClick={() => signOut()} /><span>خروج</span></div>
        
        </div ><MdKeyboardArrowDown /><FaUserCheck color='#53beea' size={27} /></div>