'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";

const SessionExpired = () => {
  const router = useRouter();

  // const handleSignOut = () => {
  //   Cookies.remove('tenantId');
  //   Cookies.remove('token');
  //   router.push(`/login`);
  // };
  const handleSignOut = () => {
    Cookies.remove('dabur_tenantId');
    Cookies.remove('dabur_token');
    router.push(`/login`);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 w-full text-black ">
      <div className="bg-white p-5 rounded-lg shadow-md w-[500px] items-center flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-center">Session Expired</h2>
        <p className="text-center text-gray-700 mb-6">
          Your session has expired.
        </p>
        <button onClick={handleSignOut}>
          <span className="text-blue-500 cursor-pointer " > click here </span>         to login.
        </button>{' '}


      </div>
    </div>
  );
};

export default SessionExpired;
