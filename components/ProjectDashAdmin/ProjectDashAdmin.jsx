import React, { useState } from 'react';
import { MdFiberNew } from "react-icons/md";
import Image from 'next/image';
import { CiCircleMore } from "react-icons/ci";
import Link from 'next/link';

function ProjectDashAdmin({ name, planName, id, isnew, userId }) {
  const [isNew, setIsNew] = useState(isnew);

  const handleMoreClick = async () => {
    try {
      const response = await fetch('/api/updateOrderStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-secret-key': process.env.NEXT_PUBLIC_SECRET_KEY,
        },
        body: JSON.stringify({ orderId: id, userId })
      });

      const data = await response.json();
      if (data.success) {
        setIsNew(false);
      } else {
        console.error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className='p-2 flex-col relative transition-all duration-1000 ease-in-out rounded-lg border-2 border-solid border-greennav flex w-4/6 items-center'>

      <div className='flex items-center w-full'>
        <div className='ml-5'>
          <Image src={`/Icons/${planName === 'wordpress1' || planName === 'wordpress2' ? 'wordpress_174881.png' : 'atom_9594472.png'}`} width={50} height={50} alt='react' />
        </div>
        <span className='w-1/4'>{planName === 'wordpress1' || planName === 'wordpress2' ? 'Wordpess' : 'Next js'}</span>
        <span className='w-1/4'>{planName === 'wordpress1' ? 'ساده و سریع' : planName === 'wordpress2' ? 'وردپرس حرفه ای' : planName === 'Next1' ? 'next js حرفه ای' : ''}</span>
        <span className='w-1/4'>{name}</span>
        <div className='w-1/4 flex justify-center items-center hover:text-blueidea'>
          <MdFiberNew className={`absolute top-0 left-0 ${isNew ? 'visible' : 'invisible'}`} size={25} color='red' />
          <Link onClick={handleMoreClick} href={`orders/${id}`}>
            <CiCircleMore size={30}  />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProjectDashAdmin;
