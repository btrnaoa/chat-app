import 'twin.macro';

type ListProps = {
  heading: string;
  children: React.ReactNode;
};

export default function List({ heading, children }: ListProps) {
  return (
    <div tw="pt-4">
      <div tw="flex items-center">
        <h2 tw="px-4 text-xs font-semibold leading-tight tracking-wide uppercase">
          {heading}
        </h2>
      </div>
      <ul tw="mt-2 space-y-1 text-sm">{children}</ul>
    </div>
  );
}
