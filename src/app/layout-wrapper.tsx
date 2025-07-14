'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Navbar from '../Components/Navigation/Navbar';
import LeftSidebar from '../Components/Navigation/LeftSideMenue/LeftSidebar';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(true);
  const [clickedMenu1, setClickedMenu1] = useState(null);
  const [clickedSubMenu, setClickedSubMenu] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = Cookies.get('token');
    setIsLoggedIn(!!token);

    if (!token && pathname !== '/login') {
      router.push('/login');
    }

    if (token && pathname === '/login') {
      router.push('/');
    }
  }, [pathname, router]);

  const toggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  const handleSignOut = () => {
    Cookies.remove('token');
    Cookies.remove('tenantId');
    setIsLoggedIn(false);
    router.push('/login');
  };

  // No layout on login page
  if (pathname === '/login') {
    return <>{children}</>;
  }

  if (!isLoggedIn) {
    return null; // or loading indicator
  }

  return (
    <>
      <Navbar handleSignOut={handleSignOut} toggleCollapse={toggleCollapse} />
      <div className="flex w-full">
        <LeftSidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          setClickedMenu1={setClickedMenu1}
          setClickedSubMenu={setClickedSubMenu}
        />
        <main className="w-full">
          <div className="w-full overflow-auto h-[92vh]">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
