import Link from 'next/link';
import React from 'react';

interface IProps {
  link: string;
  name: string;
}

const Breadcrumb = ({ link, name }: IProps) => {
  return (
    <Link
      className='ml-2 text-sm font-medium text-gray-500 hover:text-gray-700'
      href={link} legacyBehavior>
        {name}
    </Link>
  );
};

export default Breadcrumb;