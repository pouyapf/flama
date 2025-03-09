import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import ProjectDashAdmin from '../../../components/ProjectDashAdmin/ProjectDashAdmin';
import AdminNavbar from '../../../components/AdminNavbar/AdminNavbar';
import { SiOpenproject } from "react-icons/si";
import SupportAdmin from '../../../components/SupportAdmin/SupportAdmin';
import { MdDoneAll } from "react-icons/md";
import { FcSupport } from "react-icons/fc";
import requireAdminAuth from '../../../lib/requireAdminAuth';
import Head from 'next/head';
function Orders() {


    const [userData, setuserData] = useState([]);
    const [section, setSection] = useState('inprogress');
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await fetch('/api/Adminorders', 
            {
            headers: {
              'Content-Type': 'application/json',
              'x-secret-key': process.env.NEXT_PUBLIC_SECRET_KEY,
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            setuserData(data.users || []);
            console.log(data.users)
          } else {
            console.error('Failed to fetch user data:', response.status, response.statusText);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchUserData();
    }, []);
    console.log(
      "userdd",userData
    )

    function handleSection(e) {
      setSection(e);
    }
  
  return (
    <div className=' w-full flex flex-row '>
      <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>سفارشات</title>


    </Head>
         <div className=' relative w-1/5'><AdminNavbar handlefunc={handleSection}/></div>
         <div className={` flex p-5   justify-start gap-4 flex-col min-h-screen items-center 
   transition-opacity duration-200 ${section === 'inprogress' ? 'opacity-100  w-4/5    visible' : 'opacity-0 w-0 invisible'}`}> 
         <div className=' w-full mb-9 flex justify-center items-center gap-2 font-bold text-3xl'> 

<SiOpenproject />
<span>پروژه های در حال انجام</span>
</div>
             {userData?.map((i,k)=>{
            return  i.orders.map((j,l)=>{
                return  <ProjectDashAdmin userId={i?._id} isnew={j?.isNew1} id={j?._id} key={l} name={i?.name} planName={j?.planName} />
              }
   
            )




        })}</div>





<div className={` flex p-5  justify-start  overflow-x-hidden gap-4 flex-col min-h-screen items-center 
   transition-opacity duration-200 ${section === 'done' ? 'opacity-100  w-4/5    visible' : 'opacity-0 w-0  invisible'}`}> 
         <div className=' w-full mb-9 flex justify-center items-center gap-2 font-bold text-3xl'> 

<MdDoneAll />
<span>پروژه های انجام شده </span>
</div>
             {userData?.map((i,k)=>{
            return  i.orders.map((j,l)=>{
              if (j?.currentStage === 5) {
                return  <ProjectDashAdmin userId={i?._id} isnew={j?.isNew1} id={j?._id} key={l} name={i?.name} planName={j?.planName} />
              }}
   
            )




        })}</div>










<div className={` flex p-5  justify-start  overflow-x-hidden gap-4 flex-col min-h-screen items-center 
   transition-opacity duration-200 ${section === 'contact' ? 'opacity-100  w-4/5    visible' : 'opacity-0 w-0  invisible'}`}> 
         <div className=' w-full mb-9 flex justify-center items-center gap-2 font-bold text-3xl'> 

<FcSupport />
<span>تیکت های باز</span>
</div>
             {userData?.map((i,k)=>{
            return  i.orders.map((j,l)=>{
              if (j?.contact && j?.contact?.isopensup) {
                
                return  <SupportAdmin userId={i?._id} orderId={j?._id} key={l} imageUrls={j?.imageUrls} planName={j?.planName} />
              }}
   
            )




        })}</div>


<div className={` flex p-5  justify-start  overflow-x-hidden gap-4 flex-col min-h-screen items-center 
   transition-opacity duration-200 ${section === 'donesupport' ? 'opacity-100  w-4/5    visible' : 'opacity-0 w-0  invisible'}`}> 
         <div className=' w-full mb-9 flex justify-center items-center gap-2 font-bold text-3xl'> 

<FcSupport />
<span>تیکت های بسته</span>
</div>
{userData?.map((i,k)=>{
            return  i.orders.map((j,l)=>{
              if (j?.contact && !j?.contact?.isopensup) {
                
                return  <SupportAdmin userId={i?._id} orderId={j?._id} key={l} imageUrls={j?.imageUrls} planName={j?.planName} />
              }}
   
            )




        })}</div>









   

    </div>
  )
}

export default requireAdminAuth(Orders) 