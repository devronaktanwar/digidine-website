"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { PiStethoscopeBold } from "react-icons/pi";
import { RiMenu2Fill } from "react-icons/ri";
import MobileNav from "./MobileNav";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();
  const isLoggedIn = false;
  return (
    <>
      <div className="py-4 sticky top-0 px-4">
        <div className="max-screen border px-6 py-3 rounded-lg bg-white/10 backdrop-blur-lg flex justify-between items-center">
          <h1 className="flex-1">
            <Image src="/logo.png" alt="logo" width={100} height={10} />
          </h1>
          <div className="hidden md:flex items-center gap-12">
            {isLoggedIn && (
              <ul className="flex items-center gap-8">
                {navLinks.map((link) => (
                  <li key={link.name} className="font-medium">
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            )}
            <div>
              <Button className="!py-6 !px-6" onClick={() => router.push("/login")}>Login</Button>
            </div>
          </div>
          <div
            className="text-primary md:hidden"
            onClick={() => setOpenMenu(true)}
          >
            <RiMenu2Fill size={24} />
          </div>
          <MobileNav
            open={openMenu}
            setOpen={setOpenMenu}
            navLinks={navLinks}
            isLoggedIn={isLoggedIn}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;

const navLinks = [
  {
    name: "My Orders",
    href: "/my-orders",
  },
  {
    name: "Profile",
    href: "/my-profile",
  },
];
