import tw from 'twin.macro';
import Button from './Button';

export default function NameForm({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form css={tw`flex`} onSubmit={onSubmit}>
      <input
        css={tw`px-4 py-2 border rounded-full`}
        name="displayName"
        type="text"
        placeholder="Display name"
        value={value}
        onChange={onChange}
      />
      <Button css={tw`ml-2`}>Enter</Button>
    </form>
  );
}
