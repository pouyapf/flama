import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import LightEffect from '../../components/LightEffect/LightEffect';
import { SiOpenproject } from "react-icons/si";
import { MdDoneAll } from "react-icons/md";
import { FcSupport } from "react-icons/fc";
import ContactDash from '../../components/ContactDash/ContactDash';
import Inprogress from '../../components/Inprogress/Inprogress';
import DoneProjects from '../../components/DoneProjects/DoneProjects';
import requireAuth from '../../lib/requireAuth';
import { useSession } from 'next-auth/react';
import { IoMdCloseCircle } from "react-icons/io";
import Footer from '../../components/Footer/Footer';
import { BeatLoader } from 'react-spinners';
import Head from 'next/head';
function Dashboard() {
  const [section, setSection] = useState('inprogress');
  const [navstate, setNavstate] = useState(false);
  const [loading, setLoading] = useState(true);
  const menuContentRef = useRef(null);
  const { data: session } = useSession();
  const { user } = session || {};
  const { email } = user || {};
  const [userData, setUserData] = useState([]);

  function handleSection(e) {
    setSection(e);
  }

  useEffect(() => {
    if (!email) {
      setLoading(false);
      return;
    }

    let isMounted = true; // To check if the component is still mounted

    setLoading(true);

    fetch(`/api/dashboarddata?userEmail=${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-secret-key': process.env.NEXT_PUBLIC_SECRET_KEY,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (isMounted) {
          setUserData(data.user || []); 
       
          setLoading(false);
        }
      })
      .catch(error => {
        if (isMounted) {
          console.error('Error fetching user data:', error);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [email]);

  const handleClick = () => {
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

  return (
    <div className=' flex  flex-col justify-between'>
      <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>پنل کاربری</title>
      <meta name="description" content="طراحی تخصصی وبسایت های وردپرسی React Next JS" />
      <meta name="keywords" content="طراحی وبسایت,تخصصی ,React , Next js " />

    </Head>
      <Navbar settingfunc={handleClick} />
      <LightEffect />
      <div className='w-full  min-h-screen  flex justify-between flex-row mt-20'>
        <div className='border-l-2 invisible lg:visible border-r-0 border-t-0 border-b-0 fixed top-0 min-h-screen border-navtexts border-solid items-center flex-col justify-start pt-20 gap-3 flex w-1/5'>
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
            <span>درخواست پشتیبانی</span>
          </div>
        </div>

        <div ref={menuContentRef} className={`border-l-2 visible z-50 transition-all duration-300 ease-in-out bg-backgr lg:invisible border-r-0 border-t-0 border-b-0 absolute top-0 min-h-screen border-navtexts border-solid items-center flex-col justify-start pt-20 gap-3 flex ${navstate ? 'w-[70vw] h-screen opacity-100' : 'opacity-0 h-0 w-0'}`}>
          <div className='w-full flex justify-center items-center mb-24'>
            <IoMdCloseCircle color='#8f9595' onClick={handleClick} size={25} />
          </div>
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
            <span>درخواست پشتیبانی</span>
          </div>
        </div>

        <div className='mr-0 w-full lg:w-4/5 lg:mr-[20%]'>
          {loading ? (
            <div className='flex justify-center items-center h-full'>
              <BeatLoader color={'rgb(167, 139, 250)'} loading={loading} size={15} />
            </div>
          ) : userData?.orders?.length > 0 ? (
            <>
              <div className={`transition-opacity duration-700 ${section === 'inprogress' ? 'opacity-100 visible' : 'opacity-0 h-0 invisible'}`}>
                <Inprogress data={userData} />
              </div>
              <div className={`transition-opacity duration-700 ${section === 'done' ? 'opacity-100 visible' : 'opacity-0 h-0 invisible'}`}>
                <DoneProjects data={userData} />
              </div>
              <div className={`transition-opacity duration-700 ${section === 'contact' ? 'opacity-100 visible' : 'opacity-0 h-0 invisible'}`}>
                <ContactDash  data={userData}  />
              </div>
            </>
          ) : null}
        </div>
      </div>
      <div className=' w-full  fixed bottom-0'> <Footer/></div>
     
    </div>
  );
}

export default requireAuth(Dashboard);
