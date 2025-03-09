import '../styles/globals.css'
import { SessionProvider } from "next-auth/react";
import 'react-toastify/dist/ReactToastify.css';
function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
  
    </SessionProvider>
  );
}

export default MyApp;

