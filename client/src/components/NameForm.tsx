import React from 'react';
import Button from './Button';

export default function NameForm({
  textInputVal,
  onSubmit,
  onChange,
}: {
  textInputVal: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <form className="select-none" onSubmit={onSubmit}>
      <input
        className="py-2 px-4 border border-gray-200 rounded-full shadow-sm mr-2 focus:outline-none"
        name="displayName"
        type="text"
        placeholder="Display name"
        value={textInputVal}
        onChange={onChange}
      />
      <Button>Enter</Button>
    </form>
  );
}
