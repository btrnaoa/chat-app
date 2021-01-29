import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
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

  const msgInputRef = useRef<HTMLInputElement>(null);
  const socketRef = useRef<Socket | null>(null);

  const handleMessageSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const msg = inputState.message.trim();
    if (msg !== '') {
      socketRef.current?.emit('chat message', {
        user,
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
    if (msgInputRef && msgInputRef.current) {
      msgInputRef.current.focus();
    }
    if (isLoggedIn) {
      const socket = io();
      socketRef.current = socket;
      socket.on('connect', () => {
        socket.emit('user connect', { name: user, socketId: socket.id });
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
    <div className="h-screen">
      {isLoggedIn ? (
        <div className="flex items-stretch h-full">
          <Sidebar users={users} />
          <div className="flex flex-col flex-1">
            <div className="border-b border-gray-200 h-14" />
            <div className="flex flex-col justify-between flex-1 h-full px-4 pb-4 overflow-hidden">
              <ChatBox entries={chatMessages} />
              <MessageBox
                textInputRef={msgInputRef}
                textInputVal={inputState.message}
                onSubmit={(e) => handleMessageSend(e)}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
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
