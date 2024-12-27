"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { AiFillBug } from "react-icons/ai";

const Navbar = () => {

  const links = [
    { label: "Dashboard", href: "/"},
    { label: "Issues", href: "/issues"},
  ]

  const currentPath = usePathname();
  // console.log(currentPath);


  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/"><AiFillBug /></Link>
      <ul className="flex space-x-6">
        {links.map((link) => {
          return (
            <li key={link.href}><Link href={link.href} className={`${currentPath === link.href ? "text-zinc-900" : "text-zinc-500" } hover:text-zinc-800 transition-colors`}>{link.label}</Link></li>
          );
        })}
      </ul>
    </nav>
  )
}

export default Navbar