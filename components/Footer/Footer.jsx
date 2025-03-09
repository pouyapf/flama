import React from 'react';
import { FaTelegram } from "react-icons/fa6";
import Link from 'next/link';
function Footer() {
  return (
    <div className=' p-2 h-32 mt-10  bg-backgr  text-sm lg:text-lg flex-row-reverse  flex w-full justify-around items-center'>
      <div className=' flex justify-center items-center gap-8 '>
        <a
          referrerPolicy='origin'
          target='_blank'
          href='https://trustseal.enamad.ir/?id=511220&Code=TF5Ic6sf8pDIr5aYxhpHNlCFqpiUHUIE'
        >
          <img
            referrerPolicy='origin'
            src='https://trustseal.enamad.ir/logo.aspx?id=511220&Code=TF5Ic6sf8pDIr5aYxhpHNlCFqpiUHUIE'
            alt=''
            style={{ cursor: 'pointer' }}
          />
        </a>
        <div className=' text-left p-2 flex gap-1 lg:flex-row-reverse  flex-col justify-center items-center'>


        <span >  2024 &copy; </span>
        <span>Flama | Designed by Pouya Fattahi | All rights reserved</span>
        
        </div>
     
      </div>
      
        <Link href="https://t.me/poooy1"  className=' cursor-pointer flex justify-center items-center gap-2 '>
            <span>Telegram</span>
            <FaTelegram color='#53beea'  size={25}/>
            
            
      </Link>
    </div>
  );
}

export default Footer;
