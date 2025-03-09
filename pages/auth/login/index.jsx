import React, { useState } from 'react';
import css from './login.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../../../components/Navbar/Navbar';
import { BeatLoader } from 'react-spinners';
import LightEffect from '../../../components/LightEffect/LightEffect';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { from } = router.query;

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        if (result.error.includes('آیپی شما موقتا بن شد')) {
          toast.error(result.error);
        } else {
          toast.error(result.error);
        }
      } else {
        toast.success('خوش آمدید');
        router.push(from || '/');
      }
    } catch (error) {
      toast.error('خطا');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=' w-full h-screen flex-col flex justify-center items-center'>
      <Navbar />
      <LightEffect trigger={false}/>
      <div className={css.form_container}>
        <p className={css.title}>ورود</p>
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
          <div className={css.forgot}>
            <Link href={'/auth/request-reset'}>رمز عبور خود را فراموش کرده اید؟</Link>
          </div>

          {isLoading ? (
            <div className='w-full mt-12 flex justify-center items-center'>
              <BeatLoader color={'rgb(167, 139, 250)'} loading={isLoading} size={15} />
            </div>
          ) : (
            <button className={css.sign}>ورود</button>
          )}
        </form>
        <p className={css.signup}>ثبت نام نکرده اید ؟ 
          <Link href={'/auth/register'}> ثبت نام </Link>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
