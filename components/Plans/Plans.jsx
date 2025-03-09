import React from 'react'
import LightEffect from '../LightEffect/LightEffect'
import ColorLine from '../ColorLine/ColorLine'
import css from './Plans.module.css'
import { RiSendPlane2Fill } from "react-icons/ri";
import Image from 'next/image';
import { BiDollar } from "react-icons/bi";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import Link from 'next/link';
function Plans() {
  return (





<div id='plans' className=' flex flex-col relative  w-full  justify-start'>
<ColorLine color={'text-greenidea'}/><LightEffect color={'bg-green-radial-gradient'} trigger={true}/>
<div className='   mt-32 w-full flex flex-col gap-10  justify-center items-center '>
<div className='p-2 pl-4 pr-4  text-greenidea rounded-full  border-2 border-solid border-greenidea  flex justify-center items-center gap-2'> 
<RiSendPlane2Fill />
        <span>پلن ها</span></div>
         <span className='text-4xl text-center  tracking-wide font-black'>
           بریم که شروع کنیم...
            </span>
            <span className='text-sm font-thin'>سعی کردیم انواع پلن ها رو برای همه نوع کسب و کار ارعه بدیم</span>


</div>

<div className=' mt-11 flex flex-row flex-wrap   justify-around items-center gap-6'>



<div className={css.cardcont}>
  <Image
    className="top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 absolute opacity-20"
    src={"/Icons/wordpress_174881.png"}
    width={200}
    height={200}
    alt="WordPress"
  />
  <div className="gap-6 flex flex-col w-full justify-start items-start">
    <span className="font-bold text-2xl">ساده و سریع</span>
    <div className="text-4xl flex items-center justify-center">
      <BiDollar color="#a9b0b6" /> <span>از 5 میلیون تومان</span>
    </div>
    <span className="font-thin text-xl">سایت وردپرسی با قالب آماده</span>
    <div className="flex flex-col w-full justify-start items-start gap-3">
      <div className="flex items-center justify-center gap-4">
        <IoShieldCheckmarkSharp color="#a9b0b6" /> <span>آماده سازی سریع</span>
      </div>
      <div className="flex items-center justify-center gap-4">
        <IoShieldCheckmarkSharp color="#a9b0b6" /> <span>قابلیت اضافه کردن فروشگاه</span>
      </div>
      <div className="flex items-center justify-center gap-4">
        <IoShieldCheckmarkSharp color="#a9b0b6" /> <span>قیمت مناسب</span>
      </div>
      <div className="flex items-center justify-center gap-4">
        <IoShieldCheckmarkSharp color="#a9b0b6" /> <span>امکان انتخاب قالب دلخواه</span>
      </div>
      <div className="flex items-center justify-center gap-4">
        <IoShieldCheckmarkSharp color="#a9b0b6" /> <span>مناسب برای شروع کسب و کار</span>
      </div>
      <div className="flex items-center justify-center gap-4">
        <IoShieldCheckmarkSharp color="#a9b0b6" /> <span>پشتیبانی 3 ماهه</span>
      </div>
    </div>
  </div>
  <Link className=' w-full flex justify-center '  href={'order/wordpress1'}> <button className={css.btn}>ساده و سریع</button></Link>
 
</div>

<div className={css.cardcont1}>
  <Image
    className="top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 absolute opacity-20"
    src={"/Icons/wordpress_174881.png"}
    width={200}
    height={200}
    alt="WordPress"
  />
  <div className="gap-6 flex  flex-col w-full justify-start items-start">
    <span className="font-bold text-2xl">نهایت شخصی‌سازی</span>
    <div className="text-4xl flex items-center justify-center">
      <BiDollar color="#a9b0b6" /> <span>از 20 میلیون تومان</span>
    </div>
    <span className="font-thin text-xl">طراحی منحصر به فرد قالب</span>
    <div className="flex flex-col w-full justify-start items-start gap-3">
      <div className="flex items-center justify-center gap-4">
        <IoShieldCheckmarkSharp color="#a9b0b6" /> <span>سرعت فوق‌العاده سایت</span>
      </div>
      <div className="flex items-center justify-center gap-4">
        <IoShieldCheckmarkSharp color="#a9b0b6" /> <span>حداقل استفاده از افزونه‌ها</span>
      </div>
      <div className="flex items-center justify-center gap-4">
        <IoShieldCheckmarkSharp color="#a9b0b6" /> <span>نهایت شخصی‌سازی</span>
      </div>
      <div className="flex items-center justify-center gap-4">
        <IoShieldCheckmarkSharp color="#a9b0b6" /> <span>پشتیبانی 6 ماهه</span>
      </div>
    </div>
  </div>
  <Link className=' w-full flex justify-center ' href={'order/wordpress2'}><button className={css.btn}>نهایت شخصی‌سازی</button></Link>
  
</div>

<div className={css.cardcont}>
  <Image
    className="top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 absolute opacity-20"
    src={"/Icons/atom_9594472.png"}
    width={200}
    height={200}
    alt="Next.js"
  />
  <div className="gap-6 flex flex-col w-full justify-start items-start">
    <span className="font-bold text-2xl">حرفه‌ای</span>
    <div className="text-4xl flex items-center justify-center">
      <BiDollar color="#a9b0b6" /> <span>از 40 میلیون تومان</span>
    </div>
    <span className="font-thin text-xl">قالب اختصاصی با Next.js</span>
    <div className="flex flex-col w-full justify-start items-start gap-3">
      <div className="flex items-center justify-center gap-4">
        <IoShieldCheckmarkSharp color="#a9b0b6" /> <span>پنل اختصاصی</span>
      </div>
      <div className="flex items-center justify-center gap-4">
        <IoShieldCheckmarkSharp color="#a9b0b6" /> <span>مناسب برای کسب و کارهای حرفه‌ای</span>
      </div>
      <div className="flex items-center justify-center gap-4">
        <IoShieldCheckmarkSharp color="#a9b0b6" /> <span>انعطاف‌پذیری بالا</span>
      </div>
      <div className="flex items-center justify-center gap-4">
        <IoShieldCheckmarkSharp color="#a9b0b6" /> <span>مناسب سایت‌های شرکتی</span>
      </div>
      <div className="flex items-center justify-center gap-4">
        <IoShieldCheckmarkSharp color="#a9b0b6" /> <span>پشتیبانی 6 ماهه</span>
      </div>
    </div>
  </div>
  <Link className=' w-full flex justify-center ' href={'order/Next1'}><button className={css.btn}>حرفه‌ای</button></Link>
  
</div>
















</div>





<div className=' w-full h-64 bg-backgr z-40'></div>
      
</div >











  )
}

export default Plans