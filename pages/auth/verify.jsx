import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../../components/Navbar/Navbar';
import LightEffect from '../../components/LightEffect/LightEffect';

const Verify = () => {
  const router = useRouter();
  const { token } = router.query;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios
        .get(`/api/auth/verify?token=${token}`)
        .then((response) => {
          toast.success(response.data.message);
          setLoading(false);
          setTimeout(() => {
            router.push('/auth/login');
          }, 1000); // Redirect after 3 seconds
        })
        .catch((error) => {
          toast.error(error.response?.data?.message || 'خطا در تایید ایمیل');
          setLoading(false);
        });
    }
  }, [token, router]);

  if (loading) {
    return (
      <div>
         <Navbar />
         <LightEffect trigger={false}/>
        <div className='flex justify-center items-center w-full h-screen'>
          <p>در حال تایید ایمیل...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
     <Navbar />
     <LightEffect trigger={false}/>
      <div className='flex justify-center items-center w-full h-screen'>
        <p>ایمیل شما تایید شد</p>
      </div>
    </div>
  );
};

export default Verify;
