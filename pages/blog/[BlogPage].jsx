import { useEffect, useState } from 'react';
import { MongoClient } from 'mongodb';
import Navbar from '../../components/Navbar/Navbar';
import LightEffect from '../../components/LightEffect/LightEffect';
import Image from 'next/image';
import moment from 'moment-jalaali';
import Head from 'next/head';
import { BiSolidCategoryAlt } from "react-icons/bi";
import { BiSolidTimeFive } from "react-icons/bi";
import Footer from '../../components/Footer/Footer';

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  cachedClient = client;
  return client;
}

export async function getStaticPaths() {
  let paths = [];
  
  try {
    const client = await connectToDatabase();
    const db = client.db("test");

    // Fetch all posts to generate paths
    const posts = await db.collection('blogposts').find({}).toArray();

    paths = posts.map(post => ({
      params: {
        BlogPage: post.title, // Ensure the field name matches the document structure
      },
    }));
  } catch (e) {
    console.error('Error fetching paths:', e);
  }

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  let data = [];

  try {
    const client = await connectToDatabase();
    const db = client.db("test");

    const post = await db.collection('blogposts').findOne({ "title": params.BlogPage });
    if (post) {
      data = [post];
    }

  } catch (e) {
    console.error('Error fetching data:', e);
  }

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    },
    revalidate: 1,
  };
}

export default function BlogPage({ data }) {
  if (!data || data.length === 0) {
    return <div>No posts found</div>;
  }

  return (
    <div>
      <Navbar />
      <LightEffect trigger={false} />
      {data.map((post) => {
        const shamsiDate = moment(post.createdAt).format('jYYYY/jM/jD');
        return (
          <div className='mt-20 lg:p-10  p-1 flex w-full flex-col justify-start items-center' key={post._id}>
            <Head>
              <title>{post.title}</title>
              <meta name="description" content={post.content.substring(0, 160)} />
              <meta name="keywords" content="blog, music, articles" />
              <meta property="og:title" content={post.title} />
              <meta property="og:description" content={post.content.substring(0, 160)} />
              <meta property="og:image" content="/1.jpg" />
            </Head>
            <Image src={'/4.jpg'} className='w-full h-auto' width={1000} height={1000} alt='Blog Image' />

            <div className='w-5/6'>
              <div className='flex flex-col w-full justify-start'>
                <h1 className='w-5/6 mt-7 text-2xl  lg:text-4xl text-right font-bold text-blueidea'>{post.title}</h1>
                <div className='flex justify-start w-full items-center gap-5'>
                  <div className='flex   mt-20 mb-20 items-center justify-center gap-2'>
                    <span className='m-0 p-0'><BiSolidCategoryAlt className='text-navtexts' fontSize={20} /></span>
                    <span className='font-thin m-0 p-0'>دسته بندی</span>
                  </div>
                  <div className='flex items-center justify-center gap-2'>
                    <span className='m-0 p-0'><BiSolidTimeFive className='text-navtexts' fontSize={20} /></span>
                    <span className='font-thin m-0 p-0'>{shamsiDate}</span>
                  </div>
                </div>
              </div>
              <div className='blogpagediv'>


              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
              </div>
              <div className='blogpagediv' dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>
        );
      })}
      <Footer/>
    </div>
  );
}
