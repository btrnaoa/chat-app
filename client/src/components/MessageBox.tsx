import React from 'react';

export default function MessageBox({
  textInputRef,
  textInputVal,
  onSubmit,
  onChange,
}: {
  textInputRef: React.RefObject<HTMLInputElement>;
  textInputVal: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <form
      className="flex rounded-full shadow-sm text-gray-700 select-none"
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <input
        className="py-2 px-4 w-full border-t border-b border-l rounded-l-full focus:outline-none"
        ref={textInputRef}
        name="message"
        type="text"
        placeholder="Message"
        value={textInputVal}
        onChange={onChange}
      />
      <button
        className="py-2 px-4 text-sm font-semibold border-t border-r border-b rounded-r-full focus:outline-none"
        type="submit"
      >
        Send
      </button>
    </form>
  );
}
