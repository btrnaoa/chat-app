import React from 'react';

export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-full focus:outline-none hover:bg-indigo-700"
      type="submit"
    >
      {children}
    </button>
  );
}
