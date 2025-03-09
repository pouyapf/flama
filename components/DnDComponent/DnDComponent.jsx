import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { FaSitemap } from "react-icons/fa";
import NumberWithCommas from '../Numbercoma/Numbercoma';
import { AiFillDollarCircle } from "react-icons/ai";
import css from './DnDComponent.module.css';
import { useRouter } from 'next/router';
import { BeatLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
const DnDComponent = ({ data }) => {
  const [loading, setloading] = useState(false);
  const { data: session } = useSession();
  const [items, setItems] = useState(data[0]?.options?.map((option, index) => ({ ...option, id: `item-${index}` })));
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(parseInt(data[0]?.basic_price, 10));
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const handleItemClick = (item) => {
    const isSelected = selectedItems.some(selectedItem => selectedItem.id === item.id);

    if (isSelected) {
      setSelectedItems(prev => prev.filter(selectedItem => selectedItem.id !== item.id));
      setTotalPrice(prev => prev - parseInt(item.price, 10));
    } else {
      setSelectedItems(prev => [...prev, item]);
      setTotalPrice(prev => prev + parseInt(item.price, 10));
    }
  };
  const router = useRouter();
  const handleSubmit = async () => {
    setloading(true)
    if (!session) {
      alert("You must be logged in to submit an order.");
      return;
    }


    const formData = new FormData();
    formData.append('items', JSON.stringify(selectedItems));
    formData.append('totalPrice', totalPrice);
    formData.append('planName', data[0]?.plan_name);
    formData.append('description', description);
    formData.append('email', session.user.email);
    
    images.forEach((image, index) => {
      formData.append(`images`, image, image.name);
    });
    const res = await fetch('/api/order', {
      method: 'POST',
      headers: {
        'x-secret-key': process.env.NEXT_PUBLIC_SECRET_KEY,
      },
      body: formData,
    });
    
    const result = await res.json();
    if (res.ok) {
     
      toast.success('سفارش ثبت با موفقیت ثبت شد');
      ;setloading(false)
      router.push('/dashboard');
    } else {
      toast.error('خطا');
      setloading(false)
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 10);
    setImages(selectedFiles);
  };

  return (
    <div className='mt-20 flex gap-10 flex-col justify-center items-center  w-full'>
      <div className='flex  justify-center flex-wrap items-center gap-5'>
        {items?.map((item, index) => (
          <div
            key={index}
            onClick={() => handleItemClick(item)}
            className={`transition-all w-5/6 duration-300   hover:bg-greenbtn flex flex-col justify-center lg:w-fit items-center
               p-4 pl-20 pr-20  rounded-md border-2 border-solid
                border-orangeidea ${selectedItems?.some(selectedItem => selectedItem?.id === item?.id) ? ' bg-blueidea text-white' : ''}`}
          >
            <FaSitemap />
            <span>{item?.fit}</span>
            <NumberWithCommas number={item?.price} />
          </div>
        ))}
      </div>
<div className=' w-full  flex-wrap gap-10 flex justify-center items-center'>
<label className={css.custum_file_upload} htmlFor="file">
        <div className={css.icon}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24">
            <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
            <g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g>
            <g id="SVGRepo_iconCarrier"/>
            <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"></path>
          </svg>
        </div>
        <span className={css.text}>آپلود عکس</span>
        <input type="file" id="file" accept="image/*" multiple onChange={handleFileChange} />
      </label>
      <div className=' w-full   lg:w-1/5 flex items-center justify-center gap-16'>
        <textarea
          placeholder="توزیحات"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className=" h-52 resize-none lg:w-full  w-5/6 border-solid border-2 border-orangeidea  bg-transparent p-2  rounded"
        />
      </div>

</div>




      <span className=' flex justify-center items-center gap-2' > <AiFillDollarCircle size={25} /> قیمت   : <span><NumberWithCommas number={totalPrice}/> تومان</span> </span>

      <div className='mt-10 flex items-center justify-center gap-16'>
        {loading ?( <BeatLoader color={'rgb(167, 139, 250)'} loading={loading} size={15} />):( <button onClick={()=>handleSubmit()} className=' bg-bluebtn p-4 text-white  rounded'>
          مرحله بعد
        </button>)}
       
      </div>
      <ToastContainer />
    </div>
  );
};

export default DnDComponent;
