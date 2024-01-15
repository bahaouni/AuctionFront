'use client'

import Head from 'next/head';
import { useCallback, useState } from "react";
import Link from 'next/link';
import { IoArrowBack } from "react-icons/io5";

import SignUp from "../components/auth/Signup";
import SignIn from "../components/auth/Signin";

type Variant = 'LOGIN' | 'REGISTER';

const Auth = () => {
    const [variant, setVariant] = useState<Variant>('LOGIN');

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
          setVariant('REGISTER');
        } else {
          setVariant('LOGIN');
        }
      }, [variant]);

  return (
    <>
    <Head>
      <title>Home | auctionweb.site</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className='flex flex-col h-screen justify-between'>
      
      <section className="xl:bg-contain bg-top bg-no-repeat container mb-auto mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div className="flex flex-wrap justify-center items-stretch -mx-3 ">
          <div className='flex min-h-full flex-col lg:w-1/2 content-start py-12 sm:px-6 lg:px-8'>
            <div className='flex justify-between px-6 pt-4'>
              <div className=''>
                <Link href="/">
                    <IoArrowBack size="1.5em"/>
                </Link>
              </div>
              <div 
                onClick={toggleVariant} 
                className="underline cursor-pointer flex justify-center text-sm font-medium text-gray-600 hover:text-gray-500">
                <span >{variant === 'LOGIN' ? 'Signup' : 'Login'}</span>
              </div>
            </div>
            {variant === 'REGISTER' && (<SignUp></SignUp>)} 
            {variant === 'LOGIN' && (<SignIn></SignIn>)}      
          </div>
          <div className="w-full lg:w-1/2 py-12 sm:px-6 lg:px-8 lg:bg-blueGray-50 mb-12 lg:mb-0">
            <div className="flex items-center justify-center">
              <img
                className="lg:max-w-lg"
                src="https://shuffle.dev/metis-assets/illustrations/working-from-airport.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      
    </div>
  </>
  )
}

export default Auth;