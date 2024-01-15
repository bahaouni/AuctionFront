import { useState } from 'react';
import { HiPaperAirplane } from 'react-icons/hi2';
import axios from 'axios';

interface MessageInputProps {
  nickname: string;
  message: string;
  handleNicknameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleMessageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sendMessage: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  nickname,
  message,
  handleNicknameChange,
  handleMessageChange,
  sendMessage,
}) => {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <form onSubmit={onSubmit} className="flex items-center gap-2 lg:gap-4 w-full">
        <div className="relative w-full">
          <input
            className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
            id="message"
            placeholder="Write a message"
            value={message}
            onChange={handleMessageChange}
          />
        </div>
        <button
          type="submit"
          className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition"
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
