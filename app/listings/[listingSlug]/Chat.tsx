import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp, CompatClient } from '@stomp/stompjs';

import MessageBubble from './components/MessageBubble';
import MessageInput from './components/MessageInput';

const Chat = () => {
  const [messages, setMessages] = useState<{ content: string; nickname: string }[]>([]);
  const [message, setMessage] = useState('');
  const [nickname, setNickname] = useState('');
  const [stompClient, setStompClient] = useState<CompatClient | null>(null);
  const [pendingNickname, setPendingNickname] = useState('');

  useEffect(() => {
    const socket = new SockJS('http://localhost:8082/ws');
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe('/topic/messages', (message: any) => {
        const receivedMessage = JSON.parse(message.body);
        console.log(receivedMessage)

        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      });
      setStompClient(client);
    });

    return () => {
      client.disconnect();
    };
  }, []);

  const handleSetNickname = () => {
    setNickname(pendingNickname.trim());
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };
  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPendingNickname(event.target.value);
  };

  const sendMessage = () => {
    if (message.trim() && nickname.trim()) {
      const chatMessage = {
        nickname,
        content: message,
      };
      if (stompClient) {
        stompClient.send('/app/chat', {}, JSON.stringify(chatMessage));
      }

      setMessage('');  // Clear the input field after sending the message
    }
  };

  return (
    <div className="flex flex-col border h-screen">
      <div className="flex-1 overflow-y-auto max-h-[70vh]">
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            data={message.content}
            isOwn={message.nickname === nickname}
            senderNickname={message.nickname}
          />
        ))}
      </div>

      {nickname ? (
        <MessageInput
          nickname={nickname}
          message={message}
          handleNicknameChange={handleNicknameChange}
          handleMessageChange={handleMessageChange}
          sendMessage={sendMessage}
        />
      ) : (
        <div className="py-4 px-4 bg-white border-t">
          <label htmlFor="nickname" className="font-bold text-lg">
            Choose a Nickname:
          </label>
          <input
            type="text"
            id="nickname"
            className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
            placeholder="Enter your nickname"
            value={pendingNickname}
            onChange={handleNicknameChange}
          />
          <button
            className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition mt-2"
            onClick={handleSetNickname}
          >
            Set Nickname
          </button>
        </div>
      )}
    </div>
  );
};

export default Chat;
