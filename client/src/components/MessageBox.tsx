import React, { useEffect, useRef } from 'react';
import tw from 'twin.macro';

export default function MessageBox({
  textInputVal,
  onSubmit,
  onChange,
}: {
  textInputVal: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref && ref.current) ref.current.focus();
  }, []);
  return (
    <form
      css={tw`flex text-gray-700 border rounded-full select-none`}
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <input
        css={tw`flex-1 px-4 py-2 rounded-full`}
        ref={ref}
        name="message"
        type="text"
        placeholder="Message"
        value={textInputVal}
        onChange={onChange}
      />
      <button css={tw`px-4 text-sm font-semibold`} type="submit">
        Send
      </button>
    </form>
  );
}
