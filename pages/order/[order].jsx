import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import LightEffect from '../../components/LightEffect/LightEffect'
import requireAuth from '../../lib/requireAuth';
import { MongoClient } from 'mongodb';
import DnDComponent from '../../components/DnDComponent/DnDComponent'
import Footer from '../../components/Footer/Footer';
import Head from 'next/head';



let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  cachedClient = client;
  return client;
}

export async function getServerSideProps(context) {
  const { params } = context;
  try {
    if (!process.env.MONGODB_URI) {
      console.error("MONGODB_URI is not defined.");
      return {
        props: {
          allplans: [],
        },
      };
    }

    const client = await connectToDatabase();

    // Fetch data from the "plans" collection in the "music" database
    const db = client.db("plans");
    const plansdata = await db
      .collection("plans")
      .find({ plan_name: params.order })
      .sort({ timestamp: -1 })
      .toArray();

    return {
      props: {
        allplans: JSON.parse(JSON.stringify(plansdata)),
      },
    };
  } catch (e) {
    console.error("Error in getServerSideProps:", e);
    return {
      props: {
        allplans: [],
      },
    };
  }
}







function Order({allplans}) {
  
  return (
    <div className=' relative'>
      <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>سفارش</title>
      <meta name="description" content="طراحی تخصصی وبسایت های وردپرسی React Next JS" />
      <meta name="keywords" content="طراحی وبسایت,تخصصی ,React , Next js ," />

    </Head>
      <LightEffect trigger={false} />
        <Navbar/>

        <div className='  mt-32 w-full flex flex-col gap-10  justify-center items-center '>
    <div className='p-2 pl-4 pr-4  text-blueidea rounded-full  border-2 border-solid border-blueidea   flex justify-center items-center gap-2'> 
       
         <span >بیا باهم بسازیمش</span></div>
          <span className='text-4xl  text-center tracking-wide font-black'>هرچی واسه سایتت نیاز داری میتونی برداری  </span>
         <span className='text-sm font-thin'> کافیه رو هر گزینه ای که لازم داری کلیک کنی </span>

       
</div >
  {allplans && (<DnDComponent data={allplans}/>)}
        <div className=' w-full flex justify-center items-center '><span className=' w-full text-center'>
          نکته : قیمت ممکنه نسبت به توزیحات تغییر کنه
          </span></div>
        


        <div className=' w-full h-64 bg-backgr z-40'></div>
        <Footer/>
    </div>
  )
}

export default requireAuth(Order)
