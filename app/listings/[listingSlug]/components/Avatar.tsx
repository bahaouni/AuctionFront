'use client';

import Image from "next/image";

interface AvatarProps {
  image?: any;
};

const Avatar = ({ image } : AvatarProps) => {

  return (
    <div className="relative">
      <div className="
        relative 
        inline-block 
        rounded-full 
        overflow-hidden
        h-9 
        w-9 
        md:h-11 
        md:w-11
      ">
        <Image
          fill
          src={image || '/images/male-avatar-placeholder.png'}
          alt="Avatar"
        />
      </div>
    </div>
  );
}

export default Avatar;