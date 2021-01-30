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
    <form
      className="flex items-stretch space-x-3 select-none"
      onSubmit={onSubmit}
    >
      <input
        className="px-4 py-2 border rounded-full focus:outline-none"
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
