"use client"
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { NextPageContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import Breadcrumb from '../../components/Breadcrumb';
import Breadcrumbs from '../../components/Breadcrumbs';
import Countdown from '@/app/components/Countdown';
import Navbar from '@/app/components/navbar/Navbar';
import Footer from '@/app/components/Footer';
import Chat from './Chat';

interface ListingData {
  id: string;
  title: string;
  description: string;
  currentPrice: number;
  user: {
    name: string;
  };
  endTime: string;
}

interface ListingProps {
  listingData: ListingData | null;
}
const exampleListingData: ListingData = {
  id: "1",
  title: "Casque",
  description: "Wireless headphones with great sound quality.",
  currentPrice: 40,
  user: {
    name: "Baha Eddine Ouni",
  },
  endTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour from now
};

const Listing: React.FC<ListingProps> = ({ listingData }) => {
  const [listing, setListing] = useState<ListingData | null>(listingData);
  const [isBidding, setIsBidding] = useState(false);
  const [prix, setPrix] = useState<number>(exampleListingData.currentPrice);

  const onSubmit = async (body: any) => {
     setIsBidding(true);

    try {
      const response = await axios.post(`/api/bids/${listing?.id}`, {
        amount: body.amount * 100,
      });

      setListing((prevListing) => ({
        ...prevListing!,
        currentPrice: response.data.newPrice,
      }));

      toast.success('Successfully placed bid!');
    } catch (err: any) {
      err.response.data.errors.forEach((err: any) => toast.error(err.message));
    }

    setIsBidding(false);
  };

  const validationSchema = Yup.object({
    amount: Yup.string()
      .matches(
        /^\s*-?(\d+(\.\d{1,2})?|\.\d{1,2})\s*$/,
        'The start price must be a number with at most 2 decimals'
      )
      .required('Required'),
  });

  return (
    <>
      <Head>
        <title>{listing?.title} | auctionweb.site</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className='flex flex-col h-screen justify-between'>
        <Navbar></Navbar>
        <div className="container mb-auto mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
          <Breadcrumbs>
            <Breadcrumb link="/" name="Home" />
            <Breadcrumb link="/listings" name="Browse Listings" />
            <Breadcrumb link="/listings" name={exampleListingData?.title || ''} />
          </Breadcrumbs>
          <div className='flex flex-wrap -mx-8'>
            <div className='lg:w-1/2'>
              <div className=' px-8'>
                <img className="mb-4 rounded shadow" src={'/images/headphone1.jpg'} alt="Product Image" />
              </div>
              <div className='px-8 lg:mt-0 w-full order-2 lg:order-none'>
                <section className="py-3 mb-3">
                  <h3 className="text-3xl leading-tight font-semibold font-heading">
                    {exampleListingData?.title}
                  </h3>
                  <p className="mt-1 max-w-2xl text-l text-gray-500">
                    {exampleListingData?.description}
                  </p>
                </section>
                <table className='w-full mb-6'>
                  <tbody>
                    <tr className='border-t'>
                      <td className='py-3 font-medium text-gray-700'>Price</td>
                      <td className='text-right max-w-2xl text-gray-500'>
                        {prix}
                      </td>
                    </tr>
                    <tr className='border-t'>
                      <td className='py-3 font-medium text-gray-700'>Seller</td>
                      <td className='text-right max-w-2xl hover:underline cursor-pointer text-gray-500'>
                        <Link href={`/profile/${exampleListingData?.user.name}`}>
                          {exampleListingData?.user.name}
                        </Link>
                      </td>
                    </tr>
                    <tr className='border-t'>
                      <td className='py-3 font-medium text-gray-700'>Time Left</td>
                      <td className='text-right max-w-2xl text-gray-500'>
                                                <Countdown expiresAt={exampleListingData.endTime} />

                      </td>
                    </tr>
                  </tbody>
                </table>
                <Formik
                  initialValues={{
                    amount: '',
                  }}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  <Form>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <div className="relative flex items-stretch flex-grow focus-within:z-10">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <Field
                          type="text"
                          name="amount"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-7 sm:text-sm border-gray-300"
                          placeholder="Amount to bid"
                        />
                      </div>
                      <button
                        type="submit"
                       
                        className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        {isBidding ? 'Placing bid...' : 'Bid now!'}
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
            <div className='lg:w-1/2 h-screen'>
              <Chat></Chat>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};


export default Listing;
