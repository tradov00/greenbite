"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      <div className="max-w-4xl w-full px-6 py-12 text-center bg-white rounded-3xl shadow-xl">
        <h1 className="text-5xl font-extrabold text-green-700 mb-4">
          Page Not Found
        </h1>
        <p className="text-xl text-green-800 mb-6">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-green-600 text-white rounded-full font-semibold text-lg hover:bg-orange-500 transition-all"
        >
          Go Back Home
        </Link>
        <p className="mt-6 text-sm text-green-600">
          Or use the navigation bar above to explore other sections.
        </p>
      </div>
    </main>
  );
}
