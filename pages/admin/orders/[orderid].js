import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';

import requireAdminAuth from '../../../lib/requireAdminAuth';
import React from 'react';
import { PiSelectionAllFill } from "react-icons/pi";
import Image from 'next/image';

import { IoCloseCircleOutline } from "react-icons/io5";
import ProgressLine from '../../../components/ProgressLine/ProgressLine';
import NumberWithCommas from '../../../components/Numbercoma/Numbercoma';
import Modal from 'react-modal';
import { BiSolidDollarCircle } from "react-icons/bi";
import Head from 'next/head';
import AdminNavbar from '../../../components/AdminNavbar/AdminNavbar';

import { TbCircleNumber1Filled } from "react-icons/tb";
import { TbCircleNumber2Filled } from "react-icons/tb";
import { TbCircleNumber3Filled } from "react-icons/tb";

const OrderDetails = () => {
  const router = useRouter();
  const { orderid} = router.query;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userNumber, setusernumber] = useState('');



  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImage('');
    setModalIsOpen(false);
  };


  useEffect(() => {
    if (orderid) {
      console.log("Fetching order data...");
      const fetchOrder = async () => {
        try {
          const response = await axios.get(`/api/orders/${orderid}`, {
            headers: {
              'x-secret-key': process.env.NEXT_PUBLIC_SECRET_KEY,
            },
          });
          setOrder(response.data);
          setusernumber(response.data.number);
        } catch (error) {
          setError(error);
          console.log(error)
        } finally {
          setLoading(false);
        }
      };
  
      fetchOrder();
    }
  }, [orderid]);
  
  




  const handleClick = async (buttonId) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-secret-key': process.env.NEXT_PUBLIC_SECRET_KEY,
        },
     
        body: JSON.stringify({userNumber,orderid, buttonId }),
      });

      if (!res.ok) {
        throw new Error(res);
      }

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };









  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className=' w-full flex  justify-start '>
      <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{order?.planName}</title>

    </Head>
       
        

<div className='p-2  pt-20  flex-col transition-all duration-1000 ease-in-out rounded-lg  flex  w-4/5 items-center'>
      <div className='flex items-center w-full'>
        <div className='ml-5 '>
          
          <Image src={`/Icons/${order?.planName==='wordpress1' || order?.planName==='wordpress2' ? 'wordpress_174881.png' :'atom_9594472.png'  }`} width={50} height={50} alt='react' />
        </div>
        <span className='w-1/3'>{order?.planName==='wordpress1' || order?.planName==='wordpress2' ? 'Wordpess' :'Next js'  }</span>
        <span className='w-1/3'>{order?.planName === 'wordpress1' ? 'ساده و سریع' :order?.planName === 'wordpress2' ? 'وردپرس حرفه ای' :order?.planName === 'Next1' ? 'next js حرفه ای' :''}</span>
        <span className='w-1/3'>{order?.currentStage===0 ?'ارتباط کارشناس با شما' :order?.currentStage===1 ?'پرداخت مرحله ی اول' :order?.currentStage===2?'پرداخت مرحله ی دوم':order?.currentStage===3?'اتمام پروژه،پرداخت نهایی':currentStage===4?'در حال انجام' : currentStage===5?"پروژه تحویل داده شده":""}</span>
   
      </div>
      <div className={` w-full`}>
        <div className='flex  mt-5 justify-center gap-5 items-center flex-wrap w-full'>
          {
            order?.items?.map((i,k)=>(
              <div key={k} className='flex items-center border-orangeee  justify-between gap-2 flex-row   w-1/3  p-2 border-solid rounded-md border'>
            <div className='flex items-center border-orangeee justify-end gap-2 flex-row-reverse '>  <span>{i?.fit}</span>
            <PiSelectionAllFill /></div> 
            <span><NumberWithCommas number={i?.price}/></span>
           
            </div>

            ))
          }
      
  
   
         
        </div>
        <div className='  mb-10 p-2 rounded-md mt-10 flex gap-2   justify-around items-center flex-wrap  w-full'> 
        {order?.imageUrls?.map((imageUrl, index) => (
  <Image className=' transition-all rounded-md hover:border hover:border-solid bg-bluebtn  duration-500 hover:scale-110' key={index} src={imageUrl} width={150} height={100} onClick={() => openModal(imageUrl)} />
))}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}

        contentLabel="View Image"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)'
          },
          content: {
            width:'60%',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: 0,
            border: 'none',
            background: 'none'
          }
        }}
      >
        <button onClick={closeModal} style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}>
        <IoCloseCircleOutline size={25} />
        </button>
        <img src={selectedImage} alt="Full size" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </Modal>
  


        </div>
        <p className=' mr-auto ml-auto   w-5/6 text-center'>{order.description}</p>
        <div className='  w-full flex   justify-center gap-4   items-baseline  '>
          <span className=' font-bold text-3xl  m-2 text-blueidea'>مبلغ کل:</span>
           <div className=' mt-5 flex justify-center items-center flex-row-reverse gap-2  border-solid border-2 border-bluebtn p-2 rounded-lg'>
        <span className=' font-bold text-2xl text-bluebtn'> <NumberWithCommas number={order.totalPrice}/></span><BiSolidDollarCircle size={25} color='#a9b0b6' />  </div> </div>
        <div className=' w-5/6 pb-5  mr-auto ml-auto'>      <ProgressLine payout1={order.payout1 ? order.payout1.price :"" }
         payout2={order.payout2 ? order.payout2.price :"" } payout3={order.payout3 ? order.payout3.price :"" } currentStage={order.currentStage} /></div>
  
      </div>



<div className=' mb-10 mt-10 w-full flex justify-around items-center '>
  <span className='  text-2xl font-semibold'>ایمیل : {order.email} </span>
  <span className=' text-2xl font-semibold'>نام : {order.name} </span>
  <span className=' text-2xl font-semibold'>تلفن همراه  : {order.number} </span>


</div>












<div className=' flex flex-col justify-start   gap-5 w-full'>


  <div className='  w-3/5    '>
    
    {order.payout1.status ? (<div className=' w-full flex  justify-start items-center' >
      <TbCircleNumber1Filled color='#0283c5' size={27}/> 
      <div className=' mr-4 w-1/3'><NumberWithCommas number={order.payout1.price}/> </div>
      
      <span className=' font-bold  text-blueidea w-1/3'>پرداخت شده</span></div>) :(<div className=' w-full flex  justify-start items-center' >
      <TbCircleNumber1Filled color='#a9b0b6' size={27}/> 
      <div className=' mr-4 w-1/3'><NumberWithCommas number={order.payout1.price}/> </div>
      
      <span className=' text-navtexts  font-thin w-1/3'>پرداخت نشده</span><button onClick={() => handleClick(1)} className=' rounded-md bg-bluebtn text-white p-3 '>فعالسازی</button></div>)}

  </div>


  <div className='   w-3/5   '>
    
    {order.payout2.status ? (<div className=' w-full flex  justify-start items-center' >
      <TbCircleNumber2Filled color='#0283c5' size={27}/> 
      <div className=' mr-4 w-1/3'><NumberWithCommas number={order.payout2.price}/> </div>
      
      <span className=' font-bold  text-blueidea w-1/3'>پرداخت شده</span></div>) :(<div className=' w-full flex  justify-start items-center' >
      <TbCircleNumber2Filled color='#a9b0b6' size={27}/> 
      <div className=' mr-4 w-1/3'><NumberWithCommas number={order.payout2.price}/> </div>
      
      <span className=' text-navtexts  font-thin w-1/3'>پرداخت نشده</span><button onClick={() => handleClick(2)} className={`  rounded-md bg-bluebtn text-white p-3 ${order.payout1.status ? "" :"  invisible"}`}>فعالسازی</button></div>)}

  </div>

  <div className='   w-3/5   '>
    
    {order.payout3.status ? (<div className=' w-full flex  justify-start items-center' >
      <TbCircleNumber3Filled color='#0283c5' size={27}/> 
      <div className=' mr-4 w-1/3'><NumberWithCommas number={order.payout3.price}/> </div>
      
      <span className=' font-bold  text-blueidea w-1/3'>پرداخت شده</span></div>) :(<div className=' w-full flex  justify-start items-center' >
      <TbCircleNumber3Filled color='#a9b0b6' size={27}/> 
      <div className=' mr-4 w-1/3'><NumberWithCommas number={order.payout3.price}/> </div>
      
      <span className=' text-navtexts  font-thin w-1/3'>پرداخت نشده</span><button onClick={() => handleClick(3)} className={`  rounded-md bg-bluebtn text-white p-3 ${order.payout2.status && order.payout1.status ? "" :" invisible"}`}>فعالسازی</button></div>)}

  </div>




</div>



    </div>



        
   
    </div>
  );
};

export default requireAdminAuth(OrderDetails) ;
