"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { AiFillBug } from "react-icons/ai";
import classnames from 'classnames';
import { useSession } from "next-auth/react"
import { Avatar, Box, DropdownMenu, Flex, Text } from '@radix-ui/themes';


const Navbar = () => {

  // const {status, data:session} = useSession();
  // console.log("Status: ", status);
  // console.log("Session", session);

  const { status, data: session } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ]

  const currentPath = usePathname();
  // console.log(currentPath);


  return (
    <nav className="border-b mb-5 px-5 px-3">
      <Flex justify="between">
        <Flex align="center" gap="3">
          <Link href="/"><AiFillBug /></Link>
          <ul className="flex space-x-6">
            {links.map((link) => {
              return (
                <li key={link.href}><Link href={link.href}
                  className={classnames({
                    'text-zinc-900': link.href === currentPath,
                    'text-zinc-500': link.href !== currentPath,
                    'hover:text-zinc-800 transition-colors': true
                  })
                  }
                >{link.label}</Link></li>
              );
            })}
          </ul>
        </Flex>


        <Box>
          {status === "authenticated" && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Text>
                  <Avatar
                    src={session.user?.image!}
                    fallback="?"
                    size="2"
                    radius="full"
                    className="cursor-pointer"
                    referrerPolicy="no-referrer"
                  />
                </Text>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Label>
                  <Text size="2">{session.user?.email}</Text>
                </DropdownMenu.Label>
                <DropdownMenu.Item>
                  <Link href="/api/auth/signout">Log Out</Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
            // <Link href="/api/auth/signout">Log Out</Link>
          )}
          {status === "unauthenticated" && (<Link href="/api/auth/signin">Login</Link>)}
        </Box>


      </Flex>

    </nav>
  )
}

export default Navbar