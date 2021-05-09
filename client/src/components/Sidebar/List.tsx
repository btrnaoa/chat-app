import 'twin.macro';

type ListProps = {
  heading: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

export default function List({ heading, icon, children }: ListProps) {
  return (
    <div tw="p-4">
      <div tw="flex">
        <div tw="w-5 h-5 text-indigo-300">{icon}</div>
        <h2 tw="ml-1 text-sm font-semibold tracking-wide text-indigo-600">
          {heading}
        </h2>
      </div>
      <ul tw="mt-2 space-y-1">{children}</ul>
    </div>
  );
}
