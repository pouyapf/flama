import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import LightEffect from '../../components/LightEffect/LightEffect';
import Image from 'next/image';
import { MongoClient } from 'mongodb';
import Link from 'next/link';
import css from '../../styles/blog.module.css';
import Footer from '../../components/Footer/Footer';
import Head from 'next/head';
let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  cachedClient = client;
  return client;
}

export async function getStaticProps() {
  try {
    const client = await connectToDatabase();

    // Fetch data from the "blog" database
    const blogDb = client.db("test");
    const blogData = await blogDb
      .collection("blogposts")
      .find({})
      .sort({ timestamp: -1 })  // Sort by timestamp in descending order
      .toArray();

    const reversedBlogData = blogData.reverse(); // Reverse the array

    return {
      props: {
        blogData: JSON.parse(JSON.stringify(reversedBlogData)),
      },
      revalidate: 10, // Re-generate the page every 10 seconds
    };
  } catch (e) {
    console.error('Error fetching blog data:', e);
    return {
      props: {
        blogData: [],
      },
    };
  }
}

function Blog({ blogData }) {
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [postCount, setPostCount] = useState(6);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    const storedPostCount = sessionStorage.getItem('postCount');
    const storedScrollPosition = sessionStorage.getItem('scrollPosition');

    if (storedPostCount) {
      setPostCount(parseInt(storedPostCount, 10));
    }

    if (storedScrollPosition && isFirstRender) {
      window.scrollTo(0, parseInt(storedScrollPosition, 10));
      setIsFirstRender(false);
    }
  }, [isFirstRender]);

  useEffect(() => {
    setVisiblePosts(blogData.slice(0, postCount));
  }, [postCount, blogData]);

  const loadMorePosts = () => {
    const newPostCount = postCount + 6;
    setPostCount(newPostCount);
    sessionStorage.setItem('postCount', newPostCount);
  };

  const handlePostClick = () => {
    sessionStorage.setItem('scrollPosition', window.scrollY);
  };

  return (
    <div className=' p-3 relative'>
      <div className='  min-h-screen pb-10'>

      <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>بلاگ| Flama</title>
      <meta name="description" content="طراحی تخصصی وبسایت های وردپرسی React Next JS" />
      <meta name="keywords" content="طراحی وبسایت,تخصصی ,React , Next js" />

    </Head>
      <Navbar />
      <LightEffect trigger={false} />
      <div className='flex flex-row justify-center  items-center flex-wrap gap-10 mt-20'>
        {visiblePosts.map((post, index) => (
          <div key={index} className={`lg:min-h-[40rem] w-full  lg:max-h-[40rem]  lg:w-1/4 rounded-md ${css.bg} min rounded-lg flex gap-3 flex-col justify-between items-center p-5`}>
            <div className='gap-5 flex flex-col justify-start'>
              <Image className='w-full rounded' src={'/4.jpg'} alt='blog_img' width={400} height={350} />
              <span className='text-2xl w-full font-extrabold text-right text-blueidea'>{post?.title}</span>
              <p className={`w-full text-right font-thin ${css.par} text-white`}>{post?.summary}</p>
            </div>
            <Link href={`/blog/${post?.title}`} onClick={handlePostClick} className='hover:text-backgr text-center w-1/2 p-2 rounded bg-bluebtn'>
              ادامه ی مطلب
            </Link>
          </div>
        ))}
      </div>
      {visiblePosts.length < blogData.length && (
        <div className='flex justify-center mt-10'>
          <button className='hover:text-backgr w-fit p-4 rounded bg-greennav' onClick={loadMorePosts}>
            بارگذاری بیشتر
          </button>
        </div>
      )}

      </div>
 
      <Footer/>
    </div>
  );
}

export default Blog;
