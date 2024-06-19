"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import React, { useEffect, useState } from "react";

import { getCookie } from "cookies-next";

const Header = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = getCookie("token");
    if (typeof storedToken === "string") {
      setToken(storedToken);
    }
  }, []);

  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          <h1 className="font-black">TheHoodHub</h1>
        </Link>

        <nav className="md:flex-between hidden w-full max-w-xs">
          <NavItems token={token} />
        </nav>

        <div className="flex w-32 justify-end gap-3">
          {token ? (
            <>
              <Button onClick={() => setToken(null)}>Logout</Button>
              <MobileNav token={token} />
            </>
          ) : (
            <Button asChild className="rounded-full" size="lg">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
