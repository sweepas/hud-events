import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t flex justify-center items-center h-16 ml-50">
      <div className="wrapper flex flex-col gap-4 p-5 text-center sm:flex-row w-full">
        <p>The Hoob Hub. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
