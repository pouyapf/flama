import React, { useEffect, useState } from 'react';
import { RiProgress3Fill, RiProgress4Fill } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import NumberWithCommas from '../Numbercoma/Numbercoma';
import axios from 'axios';
import { useSession, signIn } from 'next-auth/react';

const ProgressLine = ({id,inprogress, currentStage, payout1, payout2, payout3 }) => {
  const [curentstate1, setcurentstate1] = useState();
  const { data: session, status } = useSession();
  const { user } = session || {};
  console.log("id",id)

  const stages = [
    { stage: [0, <BiSupport key={123} />], label: 'ارتباط با کارشناس' },
    {
      stage: [1, <RiProgress3Fill key={124} />], label: (
        <div className='flex justify-center items-center flex-col'>
          <span>پرداخت مرحله ی اول 20%</span>
          <span><NumberWithCommas number={payout1} /></span>
        </div>
      )
    },
    {
      stage: [2, <RiProgress4Fill key={125} />], label: (
        <div className='flex justify-center items-center flex-col'>
          <span>پرداخت مرحله ی دوم 30%</span>
          <span><NumberWithCommas number={payout2} /></span>
        </div>
      )
    },
    {
      stage: [3, <FaCheckCircle key={126} />], label: (
        <div className='flex justify-center items-center flex-col'>
          <span>پرداخت نهایی و تحویل پروژه</span>
          <span><NumberWithCommas number={payout3} /></span>
        </div>
      )
    }
  ];

  useEffect(() => {
    if (currentStage > 3) {
      setcurentstate1(3);
    }
    setcurentstate1(currentStage);
  }, [currentStage]);

  const initiatePayment = async (payout, amount, description) => {
    try {
      const response = await axios.post(
        '/api/payment/initiate',
        {
          orderId: id,
          payout,
          amount,
          description,
          email: user.email,
          mobile: user.number,
        },
        {
          headers: {
            'x-secret-key': process.env.NEXT_PUBLIC_SECRET_KEY,
          },
        }
      );
      
      if (response.status === 200) {
        window.location.href = response.data.url;
      } else {
        alert('Failed to initiate payment');
      }
    } catch (error) {
      console.error('Payment initiation error:', error);
      alert('An error occurred while initiating payment');
    }
  };
  
  const handleStageClick = (index) => {
    if (index === 1 && currentStage===1 && !inprogress) {
      initiatePayment('payout1', payout1, 'پرداخت مرحله ی اول 20%');
    } else if (index === 2 && currentStage===2 && !inprogress) {
      initiatePayment('payout2', payout2, 'پرداخت مرحله ی دوم 30%');
    } else if (index === 3 && currentStage===3 && !inprogress) {
      initiatePayment('payout3', payout3, 'پرداخت نهایی و تحویل پروژه');
    }
  };

  return (
    <div className="relative w-full flex items-center mt-5">
      <div className="absolute left-0 right-0 h-1 top-1/2 transform -translate-y-1/2 z-0"></div>
      <div className='absolute w-[100%]'>
        <div
          className="absolute mr-14 right-0 h-1 text-greenidea bg-gradient-to-r from-transparent via-current to-transparent top-2 transform -translate-y-1/2 z-0 transition-all duration-300"
          style={{ width: `${(curentstate1 / 4) * 114}%` }}
        ></div>
      </div>
      <div className="flex w-full justify-between">
        {stages.map((stage, index) => (
          <div key={index} className="flex flex-col items-center" onClick={() => handleStageClick(index)}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${currentStage >= stage.stage[0] ? 'bg-bluebtn cursor-pointer text-white' : 'bg-navtexts'}`}
            >
              {stage.stage[1]}
            </div>
            <div className={`mt-8 text-center ${currentStage >= stage.stage[0] ? 'text-bluebtn cursor-pointer' : 'text-navtexts'}`}>
              <div><span>{stage.label}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressLine;
