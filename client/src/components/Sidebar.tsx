import React, { useState, useEffect, useRef } from 'react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        ref.current &&
        e.target instanceof Node &&
        !ref.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <>
      <div
        className={`${
          !isOpen && 'transform -translate-x-64'
        } absolute z-10 w-64 h-full text-indigo-100 transition-all duration-300 bg-indigo-900 border-r-2 border-indigo-500 sm:static sm:translate-x-0`}
        ref={ref}
      >
        <div className="p-4">
          <h1 className="mb-2 text-xs font-semibold tracking-wider">Users</h1>
          <ul className="text-sm leading-relaxed">
            <li>Bart</li>
            <li>Ned Flanders</li>
            <li>Homer</li>
          </ul>
        </div>
      </div>
      {!isOpen && (
        <button
          className="absolute p-2 mt-1 ml-1 sm:hidden"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          <svg
            className="w-8 h-8 text-indigo-500 fill-current"
            height="512"
            viewBox="0 0 64 64"
            width="512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M50 8H14c-3.309 0-6 2.691-6 6v36c0 3.309 2.691 6 6 6h36c3.309 0 6-2.691 6-6V14c0-3.309-2.691-6-6-6zM12 50V14c0-1.103.897-2 2-2h8v40h-8c-1.103 0-2-.897-2-2zm40 0c0 1.103-.897 2-2 2H26V12h24c1.103 0 2 .897 2 2z" />
          </svg>
        </button>
      )}
    </>
  );
}
