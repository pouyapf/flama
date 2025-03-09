import React, { useState } from 'react';
import { PiSelectionAllFill } from "react-icons/pi";
import Image from 'next/image';
import { IoIosArrowDropdown } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import ProgressLine from '../ProgressLine/ProgressLine';
import NumberWithCommas from '../Numbercoma/Numbercoma';
import Modal from 'react-modal';
import { BiSolidDollarCircle } from "react-icons/bi";
function ProjectDash({id,description,inprogress,imageUrls,items,planName,totalPrice,currentStage,payout1,payout2,payout3}) {


  const [toggleopen, settoggleopen] = useState(false);
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

  function handleclick() {
    settoggleopen(!toggleopen);
  }

  return (
    <div className='p-2 flex-col transition-all duration-1000 ease-in-out rounded-lg border-2 border-solid border-greennav flex w-[95%] lg:w-4/6 items-center'>
      <div className='flex items-center w-full'>
        <div className='ml-5'>
          
          <Image src={`/Icons/${planName==='wordpress1' || planName==='wordpress2' ? 'wordpress_174881.png' :'atom_9594472.png'  }`} width={50} height={50} alt='react' />
        </div>
        <span className=' invisible w-0 lg:visible lg:w-1/4'>{planName==='wordpress1' || planName==='wordpress2' ? 'Wordpess' :'Next js'  }</span>
        <span className='w-1/3 lg:w-1/4'>{planName === 'wordpress1' ? 'ساده و سریع' :planName === 'wordpress2' ? 'وردپرس حرفه ای' :planName === 'Next1' ? 'next js حرفه ای' :''}</span>
        <span className='w-1/2 lg:w-1/4'>
  {inprogress 
    ? " در حال انجام " 
    : (
        currentStage === 0 
        ? 'ارتباط کارشناس با شما' 
        : currentStage === 1 
        ? 'پرداخت مرحله ی اول' 
        : currentStage === 2 
        ? 'پرداخت مرحله ی دوم' 
        : currentStage === 3 
        ? 'اتمام پروژه،پرداخت نهایی' 
        : currentStage === 5 
        ? 'پروژه تحویل داده شده' 
        : ''
      )
  }
</span>

        <div className='w-1/4 flex justify-center items-center hover:text-blueidea'>
          <IoIosArrowDropdown 
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
        <p className=' mr-auto ml-auto  w-5/6 text-center'>{description}</p>
        <div className='  w-full flex    justify-center gap-4   items-baseline  '>
          <span className=' font-bold text-3xl  m-2 text-blueidea'>مبلغ کل:</span>
           <div className='  mt-5 flex justify-center items-center flex-row-reverse gap-2  border-solid border-2 border-bluebtn p-2 rounded-lg'>
        <span className=' font-bold text-2xl text-bluebtn'> <NumberWithCommas number={totalPrice}/></span><BiSolidDollarCircle size={25} color='#a9b0b6' />  </div> </div>
        <div className=' w-full lg:w-5/6 pb-5  mr-auto ml-auto'>      <ProgressLine inprogress={inprogress} id={id} payout2={payout2 ? payout2?.price:""} payout3={payout3 ? payout3?.price:""} payout1={payout1 ? payout1?.price:""} currentStage={currentStage} /></div>
  
      </div>
    </div>
  );
}

export default ProjectDash;
