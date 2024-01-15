import Head from 'next/head';
import React from 'react';

import Breadcrumb from '../components/Breadcrumb';
import Breadcrumbs from '../components/Breadcrumbs';
import ListingCard from '../components/ListingCard';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/Footer';



const Listings = ({ listings, search } : any) => {
  const placeholderData = [
    { key: '1', name: 'First item', expiresAt: '2 days', price: '1000', smallImage: '/images/headphone1.jpg', slug: '/listings/0' },
    { key: '2', name: 'Second item', expiresAt: '3 days', price: '1200', smallImage: '/images/headphone2.jpg', slug: '/listings/1' },
    { key: '3', name: 'Third item', expiresAt: '4 days', price: '1220', smallImage: '/images/headphone3.jpg', slug: '/listings/2' },
  ];

  return (
    <>
      <Head>
        <title> Browsing Listings | auctionweb.site</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className='flex flex-col h-screen justify-between'>
        <Navbar/>
          <div className="container mb-auto mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <Breadcrumbs>
              <Breadcrumb link="/" name="Home" />
              <Breadcrumb link="/listings" name="Browse Listings" />
            </Breadcrumbs>
            <section className="pt-3 mb-3">
              <h3 className="text-3xl leading-tight font-semibold font-heading">
                Showing {!search ? 'all listings' : `results for "${search}"`}
              </h3>
            </section>
            <div className='py-3 flex flex-wrap -mx-2 -mb-4 '>
              {placeholderData.map(item => (
                <ListingCard
                key={item.key}
                name={item.name}
                expiresAt={item.expiresAt}
                price={item.price}
                smallImage={item.smallImage}
                slug={item.slug}
                />
                ))}
            </div>
          </div>
        <Footer></Footer>
      </div>
    </>
  );
};

/*
Listings.getInitialProps = async ({ query }: any, client : any) => {
  const { data } = await client.get(
    `/api/listings?search=${query.search || ''}`
  );

  return { listings: data || [], search: query.search };
};
*/

export default Listings;