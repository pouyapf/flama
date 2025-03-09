import React, { useState, useEffect } from 'react';
import { SiBloglovin } from "react-icons/si";
import { FaShoppingCart } from "react-icons/fa";
import { MdNewReleases } from "react-icons/md";
import requireAdminAuth from '../../lib/requireAdminAuth';
import Link from 'next/link';
import Head from 'next/head';
function Index() {
  const [hasNewOrders, setHasNewOrders] = useState(false);

  useEffect(() => {
    async function checkNewOrders() {
      try {
        const response = await fetch('/api/isnewmain',{
            headers: {
              'Content-Type': 'application/json',
              'x-secret-key': process.env.NEXT_PUBLIC_SECRET_KEY,
            },
          });
        const data = await response.json();
        setHasNewOrders(data.hasNewOrders);
      } catch (error) {
        console.error('Error fetching new orders status:', error);
      }
    }

    checkNewOrders();
  }, []);

  return (
    <div className=' w-full h-screen flex justify-center items-center gap-6'>
      <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>پنل مدیریت</title>


    </Head>
      <Link href={'admin/blog'}>
      <div className=' rounded-md p-2 border shadow-lg border-solid border-blueidea 
           transition-all duration-150 ease-in hover:text-bluebtn hover:scale-105 flex flex-col justify-start 
           gap-4 items-center w-fit h-36 '>
        <SiBloglovin size={200} />
        <span className=' text-4xl font-extrabold'>بلاگ</span>
      </div></Link>
<Link href={'admin/orders'}>
      <div className=' rounded-md p-2 relative border shadow-lg border-solid border-blueidea 
           transition-all duration-150 ease-in hover:text-bluebtn hover:scale-105 flex flex-col justify-start 
           gap-4 items-center w-fit h-36 '>
        <MdNewReleases className={`absolute top-2 right-2 ${hasNewOrders ? 'visible' : 'invisible'}`} size={25} color='red' />
        <FaShoppingCart size={200} />
        <span className=' text-4xl font-extrabold'>سفارشات</span>
      </div></Link>
    </div>
  );
}

export default requireAdminAuth(Index);
