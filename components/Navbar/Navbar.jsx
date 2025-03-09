import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaHome } from "react-icons/fa";
import { SiBloglovin } from "react-icons/si";
import { RiSendPlane2Fill } from "react-icons/ri";
import { AiOutlineLogin } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { FaUserCheck } from "react-icons/fa6";
import { useSession, signIn } from 'next-auth/react';
import { BeatLoader } from 'react-spinners';
import { CgMenuRound } from "react-icons/cg";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";
import Image from 'next/image';
import { IoSettings } from "react-icons/io5";
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { MdKeyboardArrowDown } from "react-icons/md";
function Navbar({settingfunc}) {
  const [navstate, setNavstate] = useState(false);
  const [navstatedeck, setnavstatedeck] = useState(false);
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const menuContentRef = useRef(null);
  const menuContentRefdesk = useRef(null);
  const router = useRouter();
  const isDashboardPage = router.pathname === '/dashboard';

  const { user } = session || {};


  const handleclick = () => {
    setNavstate(!navstate);
  };

  const handleClickOutside = (event) => {
    if (menuContentRef.current && !menuContentRef.current.contains(event.target)) {
      setNavstate(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);




  const handleClickOutsidedesk = (event) => {
    if (menuContentRefdesk.current && !menuContentRefdesk.current.contains(event.target)) {
      setnavstatedeck(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsidedesk);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsidedesk);
    };
  }, []);

  const handleclickdesk = () => {
    setnavstatedeck(!navstatedeck);
  };
  
  const handleclickseting = () => {
    settingfunc();
  };

  return (
    <div className='z-50 shadow-md border-b-2 fixed flex justify-around items-center bg-transparent h-16 backdrop-blur-xl top-0 bg-backgr flex-row-reverse w-full'>
      <div className='w-1/4 flex justify-center items-center'><Image className='  w-28 h-auto' src={'/Logo1.png'} width={200} height={200}
       alt='Logo'/></div>
      <div className='text-navtexts w-2/5 flex invisible lg:visible justify-center items-center gap-16'>
      {loading ? (
  <div className='w-full flex justify-center items-center'>
    <BeatLoader color={'rgb(167, 139, 250)'} loading={loading} size={15} />
  </div>
) : (
  <>
    {session ? (
      <div ref={menuContentRefdesk} className='relative'>
        <div
          className={`${
            navstatedeck
              ? 'w-28 visible opacity-100'
              : 'invisible opacity-0 w-0 h-0'
          } border border-solid border-greenidea rounded-md transition-all duration-100 ease-in p-2 gap-4 flex flex-col justify-start items-start top-8 right-7 absolute bg-backgr`}
        >
          <Link
            href={'/dashboard'}
            className='flex text-greybtn items-center flex-row-reverse justify-center gap-2 rounded-md shadow-md hover:text-white'
          >
            <span>پنل کاربری</span>
            <RiDashboardHorizontalFill />
          </Link>
          <div
            className='cursor-pointer hover:text-white flex gap-2 justify-center items-center'
            onClick={() => signOut()}
          >
            <AiOutlineLogout />
            <span>خروج</span>
          </div>
        </div>

        <div
          onClick={handleclickdesk}
          className='flex justify-center items-end flex-row-reverse'
        >
          <MdKeyboardArrowDown />
          <FaUserCheck color='#53beea' size={27} />
        </div>
      </div>
    ) : (
      <Link href={'auth/login'} className='flex flex-row-reverse gap-2 justify-center items-center'>
        <span>ورود</span>
        <AiOutlineLogin />
      </Link>
    )}
  </>
)}

        <Link href={'/'} className='hover:text-white'>خانه</Link>
        <Link href={'/blog'} className='hover:text-white'>بلاگ</Link>
        <Link href={'/#plans'} className='hover:text-white'>پلن ها</Link>
      </div>
      <div className=' flex justify-center flex-row-reverse items-center gap-2 lg:invisible'>

        {isDashboardPage && (<div className={`relative lg:invisible lg:w-0 lg:h-0 ${navstate ? 'z-[50]' : 'z-[52]'}`} ><IoSettings onClick={handleclickseting} size={25} /></div>)}
        <div className={`relative lg:invisible lg:w-0 lg:h-0 ${navstate ? 'z-[50]' : 'z-[52]'}`} onClick={handleclick}><CgMenuRound size={25} /></div>
      
      
      </div>
      <div className={`transition-all lg:invisible z-[51] duration-100  ease-in-out opacity-0 w-0 flex-col right-0 
            ${navstate ? 'w-[100vw] h-screen opacity-100' : 'opacity-0 h-0 w-0'} 
            backdrop-blur-2xl  top-0 absolute h-screen flex justify-around items-start`}>
        <div ref={menuContentRef} className={`transition-all  ${navstate ? 'w-[60vw] h-screen opacity-100'
         : 'opacity-0 h-0 w-0'}
          duration-300  ease-in-out  bg-backgr flex-col right-0  flex justify-around items-start`}>
          
          <div className='w-full flex justify-center items-center'>
            <IoMdCloseCircle color='#8f9595' onClick={handleclick} size={25} /></div>
          
          <div className='w-full  gap-20 flex flex-col'>
            <Link href={'/'} className='flex   text-greybtn items-center flex-row-reverse justify-center gap-2 hover:text-white'><span>خانه</span><FaHome /></Link>
            <Link href={'/blog'} className='flex text-greybtn items-center flex-row-reverse justify-center gap-2 hover:text-white'><span>بلاگ</span><SiBloglovin /></Link>
            <Link href={'/#plans'} className='flex text-greybtn items-center flex-row-reverse justify-center gap-2 hover:text-white'><span>پلن ها</span><RiSendPlane2Fill /></Link>
            <Link href={'/dashboard'} className='flex text-greybtn items-center flex-row-reverse justify-center gap-2 hover:text-white'><span>پنل کاربری</span><RiDashboardHorizontalFill /></Link>
          </div>
          {loading ? (
            <div className=' w-full flex justify-center items-center'> <BeatLoader color={'rgb(167, 139, 250)'} loading={loading} size={15} /></div>
           
          ) : (
            <div className='gap-2 flex w-full flex-col items-center justify-center'>
              {session ? (<FaUserCheck color='#53beea' size={27} />) : (<FaUserCircle color='#8f9595' size={27} />)}
              {session ? (     <div className=' flex flex-col justify-center items-center w-full'>
        <span>{user.name}</span>
        <div className='cursor-pointer flex gap-2 justify-center items-center'><AiOutlineLogout onClick={() => signOut()} /><span>خروج</span></div>
    
        </div>
             
              ) : (
                <div className='cursor-pointer flex gap-2 justify-center items-center'><Link className='cursor-pointer flex gap-2 justify-center items-center' href={'auth/login'}><AiOutlineLogin /><span>ورود</span></Link></div>
              )}
            </div>
          )}
        </div>
      
   
      </div>
    </div>
  );
}

export default Navbar;
