

import React from 'react'
import ProjectDash from '../ProjectDash/ProjectDash';
import { FcSupport } from "react-icons/fc";
import Support from '../Support/Support';
function ContactDash({data}) {
  return (
    <div>
        <div className=' w-full flex justify-center items-center gap-2 font-bold text-3xl'> 

        <FcSupport />
        <span>درخواست پشتیانی</span>
        </div>
        <div className=' mt-10 flex justify-center  items-center flex-col gap-4 w-full'>

        {data?.orders?.map((order, index) => {
  if (order?.currentStage === 5) {
    return (
      <Support
      userId={data?._id}
      orderId={order?._id}
        key={index}
        items={order.items}
        imageUrls={order.imageUrls}
        planName={order.planName}
      />
    );
  } else if (index===0) {
    
    return ( 
    
        <span key={index}>شما پروژه ی تمام شده ای ندارید</span>
   
      
    ); 
}
})}









        </div>
     





    </div>
  )
}

export default ContactDash