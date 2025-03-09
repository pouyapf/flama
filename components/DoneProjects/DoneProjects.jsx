import React from 'react'
import ProjectDash from '../ProjectDash/ProjectDash';
import { MdDoneAll } from "react-icons/md";
function DoneProjects({data}) {
  console.log(data)
  return (
    <div>
        <div className=' w-full flex justify-center items-center gap-2 font-bold text-3xl'> 

        <MdDoneAll />
        <span>پروژه های تکمیل شده</span>
        </div>
        <div className=' mt-10 flex justify-center  items-center flex-col gap-4 w-full'>
        {data?.orders?.map((order, index) => {
  if (order?.currentStage === 5) {
    return (
      <ProjectDash
        key={index}
        currentStage={order.currentStage}
        description={order.description}
        planName={order.planName}
        items={order.items}
        imageUrls={order.imageUrls}
        totalPrice={order.totalPrice}
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

export default DoneProjects