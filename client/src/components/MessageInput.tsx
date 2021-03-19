import React from 'react';
import tw from 'twin.macro';

export default function MessageInput({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form
      css={tw`flex text-gray-700 border rounded-full`}
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <input
        css={tw`flex-1 px-4 py-2 rounded-full`}
        type="text"
        placeholder="Message"
        value={value}
        onChange={onChange}
      />
      <button css={tw`px-4 text-sm font-semibold`} type="submit">
        Send
      </button>
    </form>
  );
}
