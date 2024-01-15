'use client';
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import Avatar from "./Avatar";

interface MessageProps {
  data: string;
  isOwn: boolean;
  senderNickname: string; // New prop
}

const MessageBubble = ({ data, isOwn, senderNickname }: MessageProps) => {
  console.log(data)
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const container = clsx('flex gap-3 p-4', isOwn && 'justify-end');
  const avatar = clsx(isOwn && 'order-2');
  const body = clsx('flex flex-col gap-2', isOwn && 'items-end');
  const xd = clsx(
    'text-sm w-fit overflow-hidden rounded-full py-2 px-3', 
    isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100', 
  );

  return ( 
    <div className={container}>
      <div className={avatar}>
        <Avatar />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">
            {senderNickname}
          </div>
        </div>
        <div className={xd}>
          {isOwn ? data : <div>{data}</div>}
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;
