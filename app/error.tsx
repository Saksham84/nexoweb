"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-emerald-200 bg-clip-text text-transparent">
          Something went wrong
        </h1>
        <p className="text-blue-200">
          We hit an unexpected error while loading this page. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3 font-medium text-white shadow-lg shadow-emerald-500/30 transition hover:opacity-90"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
