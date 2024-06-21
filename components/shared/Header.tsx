"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import React, { useEffect, useState } from "react";
import getUserInfoFromToken from "../../lib/utils";
import { useRouter } from "next/navigation";

const Header = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isStaff, setIsStaff] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = fetchTokenFromLocalStorage();
    const userInfo = getUserInfoFromToken(storedToken as string);
    if (storedToken) {
      setToken(storedToken);
    }

    if (userInfo?.isStaff) {
      setIsStaff(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/");
  };

  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          <h1 className="font-black">TheHoodHub</h1>
        </Link>

        <nav className="md:flex-between hidden w-full max-w-xs">
          <NavItems />
        </nav>

        <div className="flex w-32 justify-end gap-3">
          {token ? (
            <>
              <Button onClick={handleLogout}>Logout</Button>
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

const fetchTokenFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};
