import { MdOutlineSupportAgent } from "react-icons/md";
import React, { useState } from 'react';
import { PiSelectionAllFill } from "react-icons/pi";
import Image from 'next/image';
import { IoCloseCircleOutline } from "react-icons/io5";
import NumberWithCommas from '../Numbercoma/Numbercoma';
import Modal from 'react-modal';
import { FaRegCircleUser } from "react-icons/fa6";
import { BsFillSendFill } from "react-icons/bs";
import { useSession } from 'next-auth/react';
import { useEffect } from "react";
import { BeatLoader } from 'react-spinners';
import { MoonLoader } from 'react-spinners';
import { IoMdDoneAll } from "react-icons/io";
import { FcCustomerSupport } from "react-icons/fc";
import axios from "axios";
import { HiLockClosed } from "react-icons/hi";

function SupportAdmin({planName,orderId,userId,imageUrls,items}) {
  const { data: session } = useSession();
  console.log(session?.user?.name)
  const [contact, setContact] = useState({});

    const [toggleopen, settoggleopen] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpen1, setModalIsOpen1] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [loading, setloading] = useState(true);
    const [loading2, setloading2] = useState(false);
    function handleclick() {
      settoggleopen(!toggleopen);
    }



    const openModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        setModalIsOpen(true);
      };
      const openModal1 = () => setModalIsOpen1(true);

      const closeModal1 = () => {
        console.log("gops")
        setModalIsOpen1(false)
      };
    
      const closeModal = () => {
        setSelectedImage('');
        setModalIsOpen(false);
      };
    
      function handleclick() {
        settoggleopen(!toggleopen);
      }





      const [message, setMessage] = useState('');
      const [chat, setChat] = useState([]);
    const userword='admin';
      const sendMessage = async () => {
        setloading2(true)
        const response = await fetch('/api/supportChat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
            'x-secret-key': process.env.NEXT_PUBLIC_SECRET_KEY,

           },
          body: JSON.stringify({ userId, orderId, sender: session?.user?.name, message,role:userword })
        });
    
        const data = await response.json();
        if (data.success) {
          setChat(data.contact.messages);
          setMessage('');
          setloading2(false)
        } else {
          console.error(data.error);
        }
      };
    
      useEffect(() => {
  
        const fetchChat = async () => {
          const response = await fetch(`/api/${orderId}`, {
            headers: {
              'x-secret-key': process.env.NEXT_PUBLIC_SECRET_KEY,
            }
           }


          );
          const data = await response.json();
          setChat(data.messages);
          setloading(false)
          setContact(data.isopen);
        };
    
        fetchChat();
      }, [orderId]);

      const lastMessage = chat[chat?.length - 1];




      const handleConfirm = async () => {
        try {
          const response = await axios.post(
            '/api/updateSupportStatus',
            { userId, orderId },
            {
              headers: {
                'Content-Type': 'application/json',
                'x-secret-key': process.env.NEXT_PUBLIC_SECRET_KEY,
              },
            }
          );
          if (response.status === 200) {
            alert('Support status updated successfully');
            closeModal1();
          }
        } catch (error) {
          console.error('Failed to update support status', error);
        }
      };





  return (
    <div className='p-2 pb-5 flex-col transition-all duration-1000 ease-in-out rounded-lg border-2 border-solid border-greennav flex w-[95%] lg:w-4/6 items-center'>
 <div className='flex items-center w-full'>
        <div className='ml-5'>
          
          <Image src={`/Icons/${planName==='wordpress1' || planName==='wordpress2' ? 'wordpress_174881.png' :'atom_9594472.png'  }`} width={50} height={50} alt='react' />
        </div>
        <span className=' invisible w-0 lg:visible lg:w-1/4'>{planName==='wordpress1' || planName==='wordpress2' ? 'Wordpess' :'Next js'  }</span>
        <span className='w-1/3 lg:w-1/4'>{planName === 'wordpress1' ? 'ساده و سریع' :planName === 'wordpress2' ? 'وردپرس حرفه ای' :planName === 'Next1' ? 'next js حرفه ای' :''}</span>
        <span className="w-1/2 lg:w-1/4">
          {contact?.isopensup === false ? (

            <div className="flex flex-row-reverse justify-center gap-2 items-center"><HiLockClosed size={25} /> <span>مکالمه بسته شده</span></div>
           
          ) : (
            lastMessage && (
              <div key={lastMessage.timestamp} className="">
                {lastMessage.role === 'user' ? (
                  <div className="flex flex-row-reverse justify-center gap-2 items-center">
                    <BeatLoader color={'rgb(167, 139, 250)'} loading={true} size={15} />
                    <span>در انتظار پاسخ</span>
                  </div>
                ) : (
                  <div className="flex flex-row-reverse justify-center gap-2 items-center w-fit p-2 bg-blue-200 rounded-full">
                    <IoMdDoneAll />
                    <span>پاسخ داده شده</span>
                  </div>
                )}
              </div>
            )
          )}
        </span>

        <div className='w-1/4 flex justify-center items-center hover:text-blueidea'>
        <MdOutlineSupportAgent
            onClick={handleclick} 
            size={30} 
            className={`transition-transform duration-500 ${toggleopen ? 'rotate-180' : 'rotate-0'}`} 
          />
        </div>
      </div>
    <div className={`transition-all w-full duration-1000 ease-in-out overflow-hidden ${toggleopen ? 'max-h-screen visible' : 'max-h-0 invisible'}`}>








    <div className='flex   mt-5 justify-center gap-5 items-center flex-wrap w-full'>
          {
            items?.map((i,k)=>(
              <div key={k} className='flex items-center border-orangeee  justify-between gap-2 flex-row w-full lg:w-1/3 p-2 border-solid rounded-md border'>
            <div className='flex items-center border-orangeee justify-end gap-2 flex-row-reverse '>  <span>{i?.fit}</span>
            <PiSelectionAllFill /></div> 
            <span><NumberWithCommas number={i?.price}/></span>
           
            </div>

            ))
          }
      
  
   
         
        </div>
        <div className='  mb-10 p-2 rounded-md mt-10 flex gap-2  justify-around items-center flex-wrap w-full'> 
        {imageUrls?.map((imageUrl, index) => (
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









<div className=" w-full flex flex-col items-start justify-start relative gap-10 max-h-[30rem] overflow-y-auto">
    <div className=" flex flex-col w-full justify-start items-start gap-2">
      <div className=" absolute left-1/2 top-1/2 -translate-x-1/2  -translate-y-1/2"> <MoonLoader color={'rgb(167, 139, 250)'} loading={loading} size={70} /></div>
   
    {chat?.map((i, k) => (
  <div key={k} className={`mb-4 w-full flex flex-col ${i?.role === 'user' ? 'items-end ' : ' items-start'}`}>
    <div className={`flex justify-center gap-2 ${i?.role === 'user' ? ' flex-row-reverse' : '   flex-row'} items-center w-fit p-2 bg-navtexts rounded-full`}>
      {
        i?.role==="user" ? (  <FaRegCircleUser size={25} />):(<FcCustomerSupport size={25} />)
      }
      
    
      <span>{i?.sender}</span>
    </div>
    <p className={`bg-greennav/15 p-3 rounded-lg w-fit max-w-[80%] ${i?.role === 'user' ? 'ml-10' : '  mr-10'}`}>
      {i?.message}
    </p>
  </div>
))}

        


    </div>
    <div className=" sticky  bottom-0 flex w-full justify-center items-center">
    <div className=" w-4/6  bg-transparent border-solid border-2 border-bluebtn p-3
     gap-5 rounded-full flex justify-between items-center">
    <BsFillSendFill onClick={sendMessage} size={25} />
  
    <BeatLoader color={'rgb(167, 139, 250)'} loading={loading2} size={15} />
   
    
    <input value={message} onChange={(e) => setMessage(e.target.value)} className="  w-full    bg-transparent " placeholder="پیام شما ..." type="text" />
    </div>


    </div>

</div> 
<div className=" w-full flex justify-center items-center"><button className=" p-2 rounded mt-10   w-fit  bg-bluebtn"  onClick={openModal1}>بستن تیکت</button></div>

</div>
  
  

      <Modal
        isOpen={modalIsOpen1}
        onRequestClose={closeModal1}
        className={'  w-80 flex absolute left-1/2 top-1/2 rounded-lg p-5 -translate-y-1/2 -translate-x-1/2  flex-col gap-4  bg-backgr/80'}
        contentLabel="Confirm Action"
  
      >
        
        <p>درباره ی بستن تیکت مطمین هستید؟</p>
        <div className=" flex  justify-center items-center gap-10">  <button className=" w-20  rounded   p-2 bg-bluebtn " onClick={handleConfirm}>بله</button>
        <button className=" p-2 rounded w-20  bg-bluebtn"  onClick={closeModal1}>خیر</button></div>
      
      </Modal>
  
  
  
  
  
  
  
  </div>
  )
}

export default SupportAdmin