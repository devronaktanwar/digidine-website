'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useSessionStore } from '@/store/customerStore';
import AvatarWithDropdown from './AvatarWithDropdown';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { session } = useSessionStore();
  console.log({ session });

  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl  border-b border-border/50">
      <div className="md:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-black text-primary">
              DigiDine
            </a>
          </div>

          {/* Desktop Navigation */}
          {/* <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-primary transition-colors duration-200 px-3 py-2 text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div> */}

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            {!session?.isLoggedIn ? (
              <Button onClick={() => router.push('/register')}>Sign Up</Button>
            ) : (
              <AvatarWithDropdown />
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          'md:hidden transition-all duration-300 ease-in-out backdrop-blur-md bg-primary/95 border-b border-border/50',
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {/* {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-primary-foreground hover:text-accent hover:bg-primary-foreground/10 block px-3 py-2 text-base font-medium transition-colors duration-200 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))} */}
          <div className="pt-2">
            <Button
              variant="secondary"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
