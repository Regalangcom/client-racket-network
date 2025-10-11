import { getAuthServerSession } from "@/lib/auth-options";
import React from "react";
import ResponsiveNavbarHandler from "./responsive-navbar-handler";

const Navbar = async () => {
  const { access_token } = await getAuthServerSession();

  return <ResponsiveNavbarHandler accessToken={access_token ?? undefined} />;
};

export default Navbar;
