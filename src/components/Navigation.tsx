import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/MiCasa.png'

const Navigation: React.FC = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [isNavVisible, setIsNavVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      setLastScrollY(currentScrollY);
      setIsScrollingUp(currentScrollY === 0 || currentScrollY < lastScrollY);
    };

    const handleActivity = () => {
      setIsNavVisible(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (lastScrollY !== 0) {
          setIsNavVisible(false);
        }
      }, 15000);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleActivity);

    let timeoutId = setTimeout(() => {
      if (lastScrollY !== 0) {
        setIsNavVisible(false);
      }
    }, 15000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleActivity);
      clearTimeout(timeoutId);
    };
  }, [lastScrollY]);

  return (
    <nav className={`fixed mx-auto w-full top-0 z-50 transition-all duration-300 ${scrollDirection === 'down' && !isNavVisible ? 'opacity-0' : 'opacity-100'} ${lastScrollY === 0 ? 'bg-gray-950 bg-opacity-100 shadow-md' : isScrollingUp ? 'bg-gray-950 bg-opacity-75' : 'bg-gray-950 bg-opacity-60'}`}>
      <div className="container mx-auto py-8 px-8 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          { <img src={Logo} alt="ToursCo Logo" className="h-12 mb-2 mx-auto sm:mx-0 shadow-lg" /> }
          <Link to="/" className="text-2xl px-3 font-bold text-primary">
            MiCasa
          </Link>
        </div>
        <div className="flex self-center space-x-6">
          <Link to="/" className="text-gray-600 font-medium">
            Home
          </Link>
          <Link to="/rent" className="text-gray-600 font-medium">
            Rent
          </Link>
          <Link to="/contact" className="text-gray-600 font-medium">
            Contact
          </Link>
          <Link to="/signin" className="text-gray-600 font-medium">
            Sign In
          </Link>
          <Link to="/home" className="text-rose-300 font-medium">
            Log In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
