import React from 'react'
import ProjectDash from '../ProjectDash/ProjectDash';
import { SiOpenproject } from "react-icons/si";
function Inprogress({data}) {


  return (
    <div>
        <div className=' w-full flex justify-center items-center gap-2 font-bold text-3xl'> 

        <SiOpenproject />
        <span>پروژه های در حال انجام</span>
        </div>
        <div className=' mt-10 flex justify-center  items-center flex-col gap-4 w-full'>
        {data?.orders?.map((order, index) => {
  if (order?.currentStage != 5) {
    return (
      <ProjectDash
      payout1={order?.payout1 ? order?.payout1: "" }
      payout2={order?.payout2 ? order?.payout2: "" }
      payout3={order?.payout3 ? order?.payout3: "" }
        key={index}
        id={order._id}
        inprogress={order?.inprogress}
        currentStage={order.currentStage}
        description={order.description}
        planName={order.planName}
        items={order.items}
        imageUrls={order.imageUrls}
        totalPrice={order.totalPrice}
      />
    );
  } else {
    return ( 
      <span key={index}>شما پروژه ای در دست ساخت ندارید</span>
    ); 
}
})}


        
   

        </div>
     





    </div>
  )
}

export default Inprogress