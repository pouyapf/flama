import React, { useState } from 'react';
import css from './request-reset.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import LightEffect from '../../../components/LightEffect/LightEffect';
import Navbar from '../../../components/Navbar/Navbar';
import { BeatLoader } from 'react-spinners'; // Import BeatLoader from react-spinners
function RequestReset() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const handleSubmit = async (e) => {
    setIsLoading(true); // Set loading state to true when form is submitted
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/request-reset', { email });
      toast.success('ایمیل تایید به به ایمیل شما ارسال شد');
    } catch (error) {
      toast.error(error.response?.data?.message || 'ارور');
    } finally {
      setIsLoading(false); // Reset loading state after request completes
    }
  };

  return (
    <div className=' w-full h-screen flex-col flex justify-center items-center'>
       <Navbar />
       <LightEffect trigger={false}/>
      <div className={css.form_container}>
        <p className={css.title}>درخواست تغییر رز عبور</p>
        <form className={css.form} onSubmit={handleSubmit}>
          <div className={css.input_group}>
            <label htmlFor="email">ایمیل</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="ایمیل"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          {isLoading ? (
              <div className='w-full mt-12 flex justify-center items-center'>
                <BeatLoader color={'rgb(167, 139, 250)'} loading={isLoading} size={15} />
              </div>
            ):(
              <button className={css.sign}>ارسال ایمیل</button>
            )}
      
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default RequestReset;
