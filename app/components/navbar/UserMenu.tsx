import axios from 'axios';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';

import AppContext from '../../context/context';
import ClickAwayButton from './ClickAwayButton';

const UserMenu = () => {
  const {
    auth: { isAuthenticated, currentUser },
    setAuth,
  } = useContext(AppContext);

  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleEscape = (e: any) => {
    if (e.key === 'Esc' || e.key === 'Escape') {
      setShowUserMenu(false);
    }
  };

  const onClick = async () => {
    try {
      await axios.post('/api/auth/signout');
      setAuth({ isAuthenticated: false, currentUser: null });
    } catch (err) {}
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div className='ml-4 relative flex-shrink-0'>
      <button 
        className='bg-white rounded-full flex  text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        id="user-menu"
        aria-haspopup="true"
        onClick={() => setShowUserMenu(!showUserMenu)}
      >
        <span className='sr-only'>Open user menu</span>
        <img 
          className='h-8  w-8 rounded-full' 
          //src={currentUser.avatar} 
          alt="Your Profile Picture" />
      </button>
      {showUserMenu && (
        <>
          <ClickAwayButton onClickAway={() => setShowUserMenu(false)} />
          <div 
            className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50'
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <Link
              href={"/profile"}
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              role="menuitem">
              Your Profile
            </Link>
            <Link
              href="/dashboard/listings"
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              role="menuitem">
              Dashboard
            </Link>
            <Link
              href="/settings/profile"
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              role="menuitem">
              Settings
            </Link>
            <a className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' onClick={onClick} role="menuitem">
              Sign out
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;