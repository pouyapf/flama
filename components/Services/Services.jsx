import React from 'react'
import LightEffect from '../LightEffect/LightEffect'
import { AiOutlineAntDesign } from "react-icons/ai";
import ColorLine from '../ColorLine/ColorLine'
import css from './Services.module.css'
import Image from 'next/image';
function Services() {
  return (

     

 
        






         <div className=' flex flex-col relative  w-full  justify-start'>
 <ColorLine color={'text-blueidea'}/> <LightEffect color={'bg-blue-radial-gradient'} trigger={true}/>
<div className='   mt-32 w-full flex flex-col gap-10  justify-center items-center '>
<div className='p-2 pl-4 pr-4  text-blueidea rounded-full  border-2 border-solid border-blueidea   flex justify-center items-center gap-2'> 
      <AiOutlineAntDesign />
         <span>دیزاین مدرن رو امتحان کن</span></div>
          <span className='text-4xl  text-center tracking-wide font-black'>
            طراحی اختصاصی وبسایت ها با المان های مدرن 
             </span>


</div>
<div className='w-full   flex flex-col gap-4 mt-20 justify-start items-center'>
    <div className={css.cardcont}>
        <div className='flex flex-[40%] justify-center items-center'>
            <Image className='lg:h-64  h-auto  lg:w-64' width={250} height={250} src={'/Icons/cyber-security_7700585.png'} />
        </div>
        <div className='h-64 gap-10 text-center flex flex-col p-4 flex-[60%]'>
            <span className='text-blueidea font-extrabold text-2xl  lg:text-4xl'>خیالت از امنیت راحت باشه</span>
            <p className='font-light'>ما اینجا همه‌چی رو طوری تنظیم کردیم که خیالت از امنیت راحت باشه. هر جور خطری رو شناسایی و دفع می‌کنیم.</p>
        </div>
    </div>

    <div className={css.cardcont}>
        <div className='flex flex-[40%] justify-center items-center'>
            <Image className='lg:h-64  h-auto  lg:w-64' width={250} height={250} src={'/Icons/help-desk_4961736.png'} />
        </div>
        <div className='h-64 gap-10 text-center flex flex-col p-4 flex-[60%]'>
            <span className='text-blueidea font-extrabold text-2xl  lg:text-4xl'>هر مشکلی داشتی بسپارش به ما</span>
            <p className='font-light'>هر سوال یا مشکلی داشتی، ما همیشه اینجاییم که کمکت کنیم. هیچ‌وقت تنها نمیمونی!</p>
        </div>
    </div>

    <div className={css.cardcont}>
        <div className='flex flex-[40%] justify-center items-center'>
            <Image className='lg:h-64  h-auto  lg:w-64' width={250} height={250} src={'/Icons/customize_1426846.png'} />
        </div>
        <div className='h-64 gap-10 text-center flex flex-col p-4 flex-[60%]'>
            <span className='text-blueidea font-extrabold text-2xl  lg:text-4xl'>طراحی منحصر به فرد و اختصاصی</span>
            <p className='font-light'>همه چی رو می‌تونی طبق سلیقه خودت تنظیم کنی. طراحی‌ها همگی منحصر به فرد و اختصاصی هستن.</p>
        </div>
    </div>

    <div className={css.cardcont}>
        <div className='flex flex-[40%] justify-center items-center'>
            <Image className='lg:h-64  h-auto  lg:w-64' width={250} height={250} src={'/Icons/cyber-security_7700585.png'} />
        </div>
        <div className='h-64 gap-10 text-center flex flex-col p-4 flex-[60%]'>
            <span className='text-blueidea font-extrabold text-2xl  lg:text-4xl'>همچی اینجا خیلی سریع اتفاق میوفته</span>
            <p className='font-light'>اینجا هیچ چیز معطل نمی‌مونه، همه چی با سرعت پیش میره. تو هم آماده باش برای تغییرات سریع و فوق‌العاده!</p>
        </div>
    </div>
</div>
<div className=' w-full h-64 bg-backgr z-40'></div>
       
</div >





  )
}

export default Services