import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/Hero/Hero'
import Services from '../components/Services/Services'
import Plans from '../components/Plans/Plans'
import WebTypes from '../components/WebTypes/WebTypes'
import { useSession } from 'next-auth/react';
import Footer from '../components/Footer/Footer'
import Head from 'next/head';

function Home() {
  const { data: session, status } = useSession();
  return (
    <div className='flex  flex-col justify-start ' >
<Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>طراحی تخصصی وبسایت | Flama</title>
      <meta name="description" content="طراحی تخصصی وبسایت های وردپرسی React Next JS" />
      <meta name="keywords" content="طراحی وبسایت,تخصصی ,React , Next js ," />

    </Head>


        <Navbar />
     
  <Hero/>
    <Services/>

  <WebTypes/>
  <Plans/>
  <Footer/>
   
    
    
  


    </div>
  )
}

export default Home