import { ReactNode, useEffect, useRef, useState } from 'react';
import tw from 'twin.macro';

export default function Sidebar({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !(
          ref.current &&
          event.target instanceof Node &&
          ref.current.contains(event.target)
        )
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref]);

  return (
    <>
      <div
        tw="absolute z-10 w-64 h-full text-indigo-100 transition-all duration-300 bg-indigo-700 sm:static sm:translate-x-0"
        css={[!isOpen && tw`transform -translate-x-64`]}
        ref={ref}
      >
        {children}
      </div>
      <button
        tw="absolute m-3 sm:hidden"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        <svg
          tw="w-8 h-8 text-indigo-500 fill-current"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M50 8H14c-3.309 0-6 2.691-6 6v36c0 3.309 2.691 6 6 6h36c3.309 0 6-2.691 6-6V14c0-3.309-2.691-6-6-6zM12 50V14c0-1.103.897-2 2-2h8v40h-8c-1.103 0-2-.897-2-2zm40 0c0 1.103-.897 2-2 2H26V12h24c1.103 0 2 .897 2 2z" />
        </svg>
      </button>
    </>
  );
}
