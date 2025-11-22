import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SesoLogo } from './SesoLogo';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-seso-dark/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <SesoLogo className="w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:rotate-12" />
          <span className="font-display font-bold text-xl md:text-2xl tracking-tight text-white">
            Seso<span className="text-seso-accent">.</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="hidden md:block px-5 py-2.5 bg-white text-seso-dark font-bold text-sm rounded-full hover:bg-seso-accent hover:text-white transition-all transform hover:scale-105"
          >
            Access Portal
          </Link>
        </div>
      </div>
    </nav>
  );
};