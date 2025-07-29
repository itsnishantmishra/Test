import React, { useEffect, useState } from 'react';
import DesktopLogin from './desktopLogin'; // Your big layout component
import MobileLogin from './mobileLogin'; // The mobile-specific modal view
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1035); // Adjust breakpoint if needed
    };

    checkMobile(); // Run once on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile ? <MobileLogin /> : <DesktopLogin />;
}
