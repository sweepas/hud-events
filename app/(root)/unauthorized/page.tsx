import Link from "next/link";
import React from "react";

const Unauthorized = () => {
  return (
    <div>
      <h1>Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
      <Link href='/'>Home</Link>
    </div>
  );
};

export default Unauthorized;
