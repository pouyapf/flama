import React, { useState, useEffect } from 'react';
import css from './reset-password.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { BeatLoader } from 'react-spinners'; // Import BeatLoader from react-spinners
function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validToken, setValidToken] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      toast.success('Token received');
      // Validate token
      axios.post('/api/auth/validate-reset-token', { token })
        .then(response => {
          if (response.data.valid) {
            setValidToken(true);
          } else {
            toast.error('Invalid or expired token');
            setTimeout(() => {
              router.push('/auth/login');
            }, 3000);
          }
        })
        .catch(() => {
          toast.error('Invalid or expired token');
          setTimeout(() => {
            router.push('/auth/login');
          }, 3000);
        });
    } 
  }, [token]);

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    setIsLoading(true); // Set loading state to true when form is submitted
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('پسورد ها مطابقت ندارند');
      return;
    }
    if (!validatePassword(password)) {
      toast.error('کلمه ی عبور باید حداقل 8 کارکتر شامل حروف و عدد باشد');
      return;
    }
    try {
      const response = await axios.post('/api/auth/reset-password', {
        token,
        password,
      });
      toast.success('رمز عبور با موفقیت تغییر کرد');
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'ارور');
    } finally {
      setIsLoading(false); // Reset loading state after request completes
    }
  };

  return (
    <div className=' w-full h-screen flex-col flex justify-center items-center'>
      <div className={css.form_container}>
        <p className={css.title}>بازیابی رمز عبور</p>
        {validToken ? (
  <form className={css.form} onSubmit={handleSubmit}>
    <div className={css.input_group}>
      <label htmlFor="password">پسورد جدید</label>
      <input
        type="password"
        name="password"
        id="password"
      
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <div className={css.input_group}>
      <label htmlFor="confirmPassword">تکرار پسورد جدید</label>
      <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
  
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </div>
    {isLoading ? (
              <div className='w-full mt-12 flex justify-center items-center'>
                <BeatLoader color={'rgb(167, 139, 250)'} loading={isLoading} size={15} />
              </div>
            ):(
              <button type="submit" className={css.sign}>تغییر کلمه ی عبور</button>
            )}


   
  </form>
) : (
<p className=' text-center'>توکن نا معتبر است</p>
)}

        <ToastContainer />
      </div>
    </div>
  );
}

export default ResetPassword;
