import { MenuIcon } from '@heroicons/react/outline';
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
        tw="absolute z-10 w-64 h-full text-gray-700 transition bg-white border-r md:shadow-none md:static md:translate-x-0"
        css={[
          isOpen ? tw`shadow-lg` : tw`transform -translate-x-64 shadow-none`,
        ]}
        ref={ref}
      >
        {children}
      </div>
      <button
        tw="absolute m-4 md:hidden"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        <MenuIcon tw="w-6 h-6 text-gray-400" />
      </button>
    </>
  );
}
