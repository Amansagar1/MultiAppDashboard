// pages/404.js
import React from 'react';
import Link from 'next/link';

const Custom404 = () => (
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-gray-700 mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-500">The page you are looking for does not exist.</p>
        <Link href="/login" passHref>
            <div className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Go Back Home
            </div>
        </Link>
    </div>
);

export default Custom404;
