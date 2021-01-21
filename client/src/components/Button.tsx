import React from 'react';

export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="py-2 px-4 bg-indigo-600 text-indigo-100 font-semibold leading-relaxed rounded-full focus:outline-none hover:bg-indigo-500 hover:text-white"
      type="submit"
    >
      {children}
    </button>
  );
}
