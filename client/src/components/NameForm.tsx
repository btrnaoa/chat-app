import React from 'react';
import tw from 'twin.macro';
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
      css={tw`flex items-stretch space-x-3 select-none`}
      onSubmit={onSubmit}
    >
      <input
        css={tw`px-4 py-2 border rounded-full focus:outline-none`}
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
