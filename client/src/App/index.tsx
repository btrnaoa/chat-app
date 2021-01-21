import React, { useState, useEffect, useRef } from 'react';
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

  const handleMessageSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { displayName, message } = inputState;
    const msg = message.trim();
    if (msg !== '') {
      setChatMessages(
        chatMessages.concat({
          user: displayName.trim(),
          message: msg,
          time: Date.now(),
        })
      );
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

  const messageInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (messageInput && messageInput.current) {
      messageInput.current.focus();
    }
  }, [isLoggedIn]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {isLoggedIn ? (
        <div className="flex flex-col justify-between p-4 w-full h-full">
          <ChatBox entries={chatMessages} />
          <MessageBox
            textInputRef={messageInput}
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
