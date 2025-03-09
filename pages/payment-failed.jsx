
import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import LightEffect from '../components/LightEffect/LightEffect'
import { IoMdCloseCircle } from "react-icons/io";
import { useRouter } from 'next/router';


function Paymentfailed() {
  const router = useRouter();
  const { trackingCode } = router.query;
  return (
    <div className=' h-screen flex-col w-full flex justify-center items-center'>
        <Navbar/>
        <LightEffect/>
        <div className=' text-backgr bg-white shadow-lg rounded-lg  w-1/5 h-60 flex flex-col  justify-around items-center'>
        <IoMdCloseCircle size={100} color='#9d6a55' />
        <span className=' text-center' >متاسفانه پرداخت موفقیت آمیز نبود.درصورت نیاز با پشتیبانی در تماس باشید</span>
        <div className=' flex flex-row-reverse justify-center items-center gap-2'><strong>{trackingCode}</strong><span>کد پیگیری : </span></div>
        
        </div>


    </div>
  )
}

export default Paymentfailed