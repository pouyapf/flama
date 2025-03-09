import React from 'react'
import { FaAtlassian } from "react-icons/fa";
import Image from 'next/image';
import { BiSolidShoppingBags } from "react-icons/bi";
import { BiSolidOffer } from "react-icons/bi";
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import LightEffect from '../LightEffect/LightEffect';
import Link from 'next/link';
import css from './Hero.module.css'
function Hero() {

    const { scrollY } = useViewportScroll();
    const rotateX = useTransform(scrollY, [50, 500], [90, 20]); // Adjust the second array for how much scrolling it takes to fully un-rotate


  return (
    <div className=' z-10 flex flex-col relative  w-full  justify-start'>
     <LightEffect trigger={false}/>
<div className='  mt-32 w-full flex flex-col gap-10  justify-center items-center '>
    <div className='p-2 pl-4 pr-4  text-blueidea rounded-full  border-2 border-solid border-blueidea   flex justify-center items-center gap-2'> 
         <FaAtlassian />
         <span >ایده هاتو واقعی کن</span></div>
          <span className='text-4xl text-center  tracking-wide font-black'>اوج گرفتن کسب و کارت از همینجا شروع میشه</span>
         <span className='text-sm font-thin'>پلن ها و محصولات رو پایین تر میتونی ببینی</span>
<div className=' flex  gap-5'>

<Link href={'/#plans'} className=' bg-transparent border border-solid flex justify-center items-center gap-2 p-3 rounded-md hover:opacity-80'>پلن ها</Link>
<Link href={'/#webtypes'} className=' bg-bluebtn flex justify-center items-center gap-2 p-3 rounded-lg hover:opacity-80'>خدمات</Link>

</div>
       
</div >





<div className="sm:h-auto md:h-auto  flex  justify-center items-center  lg:h-screen">

       <Image className=' w-full h-full object-contain ' src={'/1.jpg'} width={1000} alt='Main_pic' height={1000}/>
        

    </div>


    <div className={` w-full  ${css.blockk} bg-backgr z-40`}></div>







    
    </div>
  )
}

export default Hero