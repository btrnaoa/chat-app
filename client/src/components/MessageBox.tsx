import React, { useEffect, useRef } from 'react';

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
      className="flex text-gray-700 rounded-full select-none"
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <input
        className="flex-1 px-4 py-2 border-t border-b border-l rounded-l-full focus:outline-none"
        ref={ref}
        name="message"
        type="text"
        placeholder="Message"
        value={textInputVal}
        onChange={onChange}
      />
      <button
        className="px-4 text-sm font-semibold border-t border-b border-r rounded-r-full focus:outline-none"
        type="submit"
      >
        Send
      </button>
    </form>
  );
}
