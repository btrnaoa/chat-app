import 'twin.macro';

type ListProps = {
  heading: string;
  children: React.ReactNode;
};

export default function List({ heading, children }: ListProps) {
  return (
    <div tw="p-4">
      <div tw="flex items-center">
        <h2 tw="px-2 text-xs leading-tight tracking-wide text-indigo-400 uppercase">
          {heading}
        </h2>
      </div>
      <ul tw="mt-2 space-y-1 text-sm">{children}</ul>
    </div>
  );
}
