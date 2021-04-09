import { useState } from 'react';
import tw from 'twin.macro';

type MessageInputProps = {
  handleMessage: (content: string) => void;
};

export default function MessageInput({ handleMessage }: MessageInputProps) {
  const [value, setValue] = useState('');
  return (
    <form
      css={tw`flex text-gray-700 border rounded-full`}
      autoComplete="off"
      onSubmit={(event) => {
        event.preventDefault();
        handleMessage(value);
        setValue('');
      }}
    >
      <input
        css={tw`flex-1 px-4 py-2 rounded-full`}
        type="text"
        placeholder="Message"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button css={tw`px-4 text-sm font-semibold`} type="submit">
        Send
      </button>
    </form>
  );
}
