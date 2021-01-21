import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import ChatBox from '../components/ChatBox';
import MessageBox from '../components/MessageBox';
import NameForm from '../components/NameForm';
import { ChatMessageProps } from '../components/ChatMessage';

export default function App() {
  const [inputState, setInputState] = useState({
    displayName: '',
    message: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessageProps[]>([]);

  const msgInputRef = useRef<HTMLInputElement>(null);
  const socketRef = useRef<Socket | null>(null);

  const handleMessageSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { displayName, message } = inputState;
    if (message !== '') {
      const msg = {
        user: displayName.trim(),
        message: message.trim(),
        time: Date.now(),
      };
      setChatMessages(chatMessages.concat(msg));

      // Send message to other users
      socketRef.current?.emit('chat message', msg);

      setInputState({
        ...inputState,
        message: '',
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputState({
      ...inputState,
      [name]: value,
    });
  };

  useEffect(() => {
    if (msgInputRef && msgInputRef.current) {
      msgInputRef.current.focus();
    }
    if (isLoggedIn) {
      const socket = io();
      socketRef.current = socket;
      socket.on('chat message', (msg: ChatMessageProps) => {
        setChatMessages((prev) => prev.concat(msg));
      });
    }
  }, [isLoggedIn]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {isLoggedIn ? (
        <div className="flex flex-col justify-between p-4 w-full h-full">
          <ChatBox entries={chatMessages} />
          <MessageBox
            textInputRef={msgInputRef}
            textInputVal={inputState.message}
            onSubmit={(e) => handleMessageSend(e)}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
      ) : (
        <NameForm
          textInputVal={inputState.displayName}
          onSubmit={(e) => {
            e.preventDefault();
            setIsLoggedIn(true);
          }}
          onChange={(e) => handleInputChange(e)}
        />
      )}
    </div>
  );
}
