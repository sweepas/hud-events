import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import getUserInfoFromToken from "../../lib/utils";

const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "My Profile",
    route: "/profile",
  },
];

const staffLink = {
  label: "Create Event",
  route: "/events/add-event",
};

interface NavItemsProps {
  token: string | null;
}

const NavItems: React.FC<NavItemsProps> = ({ token }) => {
  const pathname = usePathname();
  const userInfo = token ? getUserInfoFromToken(token) : null;
  const isStaff = userInfo?.isStaff || false;

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks.map((link) => {
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
      {isStaff && (
        <li
          key={staffLink.route}
          className={`${
            pathname === staffLink.route && "text-primary-500"
          } flex-center p-medium-16 whitespace-nowrap`}
        >
          <Link href="/add-event">{staffLink.label}</Link>
        </li>
      )}
    </ul>
  );
};

export default NavItems;
