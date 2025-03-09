import React from 'react';

import { SiOpenproject } from "react-icons/si";
import { MdDoneAll } from "react-icons/md";
import { FcSupport } from "react-icons/fc";
import { useState } from 'react';
import { HiLockClosed } from "react-icons/hi";

function AdminNavbar({handlefunc}) {

    const [section, setSection] = useState('inprogress');
  
    function handleSection(e) {
      setSection(e);
      handlefunc(e)
    }
  
  return (
    <div className='border-l-2 border-r-0 border-t-0 border-b-0 fixed top-0 min-h-screen border-navtexts border-solid items-center flex-col justify-start pt-20 gap-3 flex w-1/5'>
    <div onClick={() => handleSection('inprogress')} className={`flex gap-2 ${section === 'inprogress' ? 'bg-greennav' : ''} p-6 border-2 border-solid rounded-md border-bluebtn transition ease-in duration-250 items-center hover:bg-greenidea justify-center hover:border-greennav w-[90%]`}>
      <SiOpenproject />
      <span>پروژه های در حال انجام</span>
    </div>
    
    <div onClick={() => handleSection('done')} className={`flex gap-2 p-6 border-2 ${section === 'done' ? 'bg-greennav' : ''} border-solid rounded-md border-bluebtn transition ease-in duration-250 items-center hover:bg-greenidea justify-center hover:border-greennav w-[90%]`}>
      <MdDoneAll />
      <span>پروژه های انجام شده</span>
    </div>

    <div onClick={() => handleSection('contact')} className={`flex gap-2 p-6 border-2 ${section === 'contact' ? 'bg-greennav' : ''} border-solid rounded-md border-bluebtn transition ease-in duration-250 items-center hover:bg-greenidea justify-center hover:border-greennav w-[90%]`}>
      <FcSupport />
      <span>تیکت های باز</span>
    </div>
    <div onClick={() => handleSection('donesupport')} className={`flex gap-2 p-6 border-2 ${section === 'contact' ? 'bg-greennav' : ''} border-solid rounded-md border-bluebtn transition ease-in duration-250 items-center hover:bg-greenidea justify-center hover:border-greennav w-[90%]`}>
      <HiLockClosed />
      <span>تیکت های بسته شده</span>
    </div>
  </div>
  )
}

export default AdminNavbar