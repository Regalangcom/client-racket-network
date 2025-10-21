import { getAuthServerSession } from "@/lib/auth-options";
import React from "react";
import ResponsiveNavbarHandler from "./responsive-navbar-handler";

const Navbar = async () => {
  const { access_token } = await getAuthServerSession();
  // console.log("acces token from index", access_token);

  return <ResponsiveNavbarHandler access_token={access_token ?? undefined} />;
};

export default Navbar;
