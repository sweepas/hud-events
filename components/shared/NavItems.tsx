import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import getUserInfoFromToken from "../../lib/utils";

export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Create Event",
    route: "/events/add-event",
  },
  {
    label: "My Profile",
    route: "/profile",
  },
];

const NavItems = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isStaff, setIsStaff] = useState(false);

  useEffect(() => {
    const token = fetchTokenFromLocalStorage();
    if (token) {
      const userInfo = getUserInfoFromToken(token);
      if (userInfo?.isStaff) {
        setIsStaff(true);
      }
    }
  }, []);

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks.map((link) => {
        if (link.route === "/events/create" && !isStaff) {
          return null;
        }
        const isActive = pathname === link.route;

        return (
          <li
            key={link.route}
            className={`${
              isActive && "text-primary-500"
            } flex-center p-medium-16 whitespace-nowrap`}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;

const fetchTokenFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};
