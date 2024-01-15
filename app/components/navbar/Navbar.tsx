'use client'

import axios from 'axios';
import React, { useContext, useState } from 'react';

import AppContext from '../../context/context';
import NavbarTab from './NavbarTab';
import SearchBar from './SearchBar';
import DesktopUserMenu from './UserMenu';


const Navbar = () => {
  const {
    auth: { isAuthenticated, currentUser},
    setAuth,
  } = useContext(AppContext);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const onClick = async () => {
    try {
      await axios.post('/api/auth/signout');
      setAuth({ isAuthenticated: false, currentUser: null });
    } catch (err) {}
  };

  return (
    <nav className='bg-white shadow'>
      <div className='max-w-7xl mx-auto px-2 sm:px-4 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex px-2 lg:px-0'>
            <div className='hidden lg:ml-6 lg:flex lg:space-x-8'>
              <NavbarTab href="/" name="Home" />
              <NavbarTab href="/listings" name="Browse Listings" />
              
            </div>
          </div>
          <SearchBar />
          <div className='flex items-center lg:hidden'>
            <div className='
                inline-flex 
                items-center 
                justify-center 
                p-2 
                rounded-md 
                text-gray-400 
                hover:text-gray-500 
                hover:bg-gray-100 
                focus:outline-none 
                focus:ring-2 
                focus:ring-inset 
                focus:ring-indigo-500'
              onClick={() => setShowMobileNav(!showMobileNav)}
              aria-expanded="false"
            >
              <span className='sr-only'>Open main menu</span>
              {/*showMobileNav ? <HamburgerMenuIcon /> : <CloseIcon />*/}
            </div>
          </div>
          {isAuthenticated ? (
            <div className='hidden lg:ml-4 lg:flex lg:items-center'>
              <DesktopUserMenu />
            </div>
          ) : (
            <div className='hidden lg:ml-6 lg:flex lg:space-x-8'>
              <NavbarTab href="/auth" name="Sign in" />
            </div>
          )}
        </div>
      </div>
      {showMobileNav && (
        <div className='lg:hidden'>
          <div className='pt-2 pb-3 space-y-1'>
            <NavbarTab href="/" name="Home" />
            <NavbarTab href="/listings" name="Browse Listings" />
            {isAuthenticated && <NavbarTab href="/sell" name="Sell an Item" />}
          </div>
          <div className='pt-4 pb-3 border-t border-gray-200'>
            {isAuthenticated && (
              <div className='flex items-center px-4'>
                <div className='flex-shrink-0'>
                  <img
                    className='h-10 w-10 rounded-full'
                    //src={currentUser.avatar}    
                    alt="Your Profile Picture"
                  />
                </div>
                <div className='ml-3'>
                  <div className='text-base font-medium text-gray-800'>
                    {/*currentUser.name*/}
                  </div>
                  <div className='text-sm font-medium text-gray-500'>
                    {/*currentUser.email*/}
                  </div>
                </div>
              </div>
            )}
            <div className='pt-2 pb-3 space-y-1'>
              {isAuthenticated ? (
                <>
                  <NavbarTab
                    href={"/profil"}
                    name="Your Profile"
                  />
                  <NavbarTab href="/dashboard/listings" name="Dashboard" />
                  <NavbarTab href="/settings/profile" name="Settings" />
                  <button 
                  className='border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium' 
                  onClick={onClick}>
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <NavbarTab href="/auth/signin" name="Sign in" />
                  <NavbarTab href="/auth/signup" name="Sign up" />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;