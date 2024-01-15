import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import SearchIcon from './SearchIcon';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/listings`,);

    setSearch('');
  };

  return (
    <div className='flex-1 flex items-center justify-center lg:ml-6 lg:justify-end'>
      <div className='max-w-lg  w-full lg:max-w-xs relative'>
        <label className='sr-only' htmlFor="search">Search</label>
        <form onSubmit={onSubmit}>
          <SearchIcon />
          <input
            className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 
          bg-white placeholder-gray-500 focus:outline-none 
          focus:placeholder-gray-400 focus:ring-1  focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="search"
            name="search"
            placeholder="Search listings"
            type="text"
          />
        </form>
      </div>
    </div>
  );
};

export default SearchBar;