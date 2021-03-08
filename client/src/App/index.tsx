import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import tw from 'twin.macro';
import ChatBox from '../components/ChatBox';
import MessageBox from '../components/MessageBox';
import NameForm from '../components/NameForm';
import Sidebar from '../components/Sidebar';
import { ChatMessageProps, User } from '../common/types';

export default function App() {
  const [inputState, setInputState] = useState({
    displayName: '',
    message: '',
  });
  const [user, setUser] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessageProps[]>([]);

  const socketRef = useRef<Socket | null>(null);

  const handleMessageSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const msg = inputState.message.trim();
    if (msg !== '') {
      socketRef.current?.emit('chat message', {
        heading: user,
        time: Date.now(),
        message: msg,
      });
      setInputState({
        ...inputState,
        message: '',
      });
    }
  };

  const handleNameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = inputState.displayName.trim();
    if (name !== '') {
      setUser(name);
      setIsLoggedIn(true);
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
    if (isLoggedIn) {
      const socket = io();
      socketRef.current = socket;
      socket.on('connect', () => {
        setChatMessages((prev) => prev.concat({ heading: 'Welcome!' }));
        socket.emit('user connect', { id: socket.id, name: user });
      });
      socket.on('chat message', (data: ChatMessageProps) => {
        setChatMessages((prev) => prev.concat(data));
      });
      socket.on('users', (data: User[]) => {
        setUsers(data);
      });
    }
  }, [isLoggedIn, user]);

  return (
    <div css={tw`h-screen`}>
      {isLoggedIn ? (
        <div css={tw`flex items-stretch h-full`}>
          <Sidebar users={users} />
          <div css={tw`flex flex-col flex-1`}>
            <div css={tw`border-b border-gray-200 h-14`} />
            <div
              css={tw`flex flex-col justify-between flex-1 h-full px-4 pb-4 overflow-hidden`}
            >
              <ChatBox entries={chatMessages} />
              <MessageBox
                textInputVal={inputState.message}
                onSubmit={(e) => handleMessageSend(e)}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </div>
        </div>
      ) : (
        <div css={tw`flex items-center justify-center h-full`}>
          <NameForm
            textInputVal={inputState.displayName}
            onSubmit={(e) => handleNameSubmit(e)}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
      )}
    </div>
  );
}
