import React, { useState } from 'react';
import css from "./register.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar/Navbar';
import LightEffect from '../../../components/LightEffect/LightEffect';
import { useRouter } from 'next/router';
import { BeatLoader } from 'react-spinners'; // Import BeatLoader from react-spinners

function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [number, setNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const { data: session } = useSession();
  const router = useRouter();
  const isLoggedIn = session != null;

  useEffect(() => {
  
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);
  const validateForm = () => {
    if (!name) {
      toast.error('نام را وارد کنید');
      return false;
    }
    if (!email) {
      toast.error('ایمیل را وارد کنید');
      return false;
    }
    if (!password) {
      toast.error('پسورد را وارد کنید');
      return false;
    }
    if (password.length < 8) {
      toast.error('پسورد باید حداقل ۸ کاراکتر باشد');
      return false;
    }
    if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      toast.error('پسورد باید شامل حروف و اعداد باشد');
      return false;
    }
    if (password !== confirmPassword) {
      toast.error('تأیید پسورد با پسورد مطابقت ندارد');
      return false;
    }
    if (!/^\d*$/.test(number)) {
      toast.error('شماره تلفن باید فقط شامل اعداد باشد');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true); // Set loading state to true when form is submitted
      try {
        const response = await axios.post('/api/auth/register', {
          name,
          email,
          password,
          number
        });
        toast.success(response.data.message);
        // Clear form fields after successful submission
        setName('');
        setEmail('');
        setPassword('');
        setNumber('');
      } catch (error) {
        toast.error(error.response?.data?.message);
      } finally {
        setIsLoading(false); // Reset loading state after request completes
      }
    }
  };
  

  return (
    <div className=' w-full h-screen flex-col flex justify-center items-center'>
       <Navbar />
       <LightEffect trigger={false}/>
      {!isLoggedIn &&     <div className={css.form_container}>
        <p className={css.title}>ثبت نام</p>
        <form className={css.form} onSubmit={handleSubmit}>
          <div className={css.input_group}>
            <label htmlFor="name">نام</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="نام"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={css.input_group}>
            <label htmlFor="email">ایمیل</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="ایمیل"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
       
          <div className={css.input_group}>
            <label htmlFor="password">پسورد</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="پسورد"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={css.input_group}>
            <label htmlFor="confirmPassword">تأیید پسورد</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="تأیید پسورد"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className={css.input_group}>
            <label htmlFor="number">شماره تلفن</label>
            <input
              type="text"
              name="number"
              id="number"
              placeholder="ترجیحا تلگرام یا واتساپ فعال"
              value={number}
              onChange={(e) => handleNumberChange(e)}
            />
          </div>

          {isLoading ? (
              <div className='w-full mt-12 flex justify-center items-center'>
                <BeatLoader color={'rgb(167, 139, 250)'} loading={isLoading} size={15} />
              </div>
            ):(
              <button className={css.sign}>ثبت نام</button>
            )}
       
        </form>
        <p className={css.signup}>قبلا ثبت نام کرده اید؟
        <Link href={'/auth/login'}>ورود</Link>
		
	</p>
        <ToastContainer />
      </div> }
  
    </div>
  );

  function handleNumberChange(e) {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setNumber(value);
    }
  }
}

export default Register;
