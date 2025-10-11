import { getAuthServerSession } from "@/lib/auth-options";
import BottomNavbarMenu from "./bottom-navbar-menu";

const BottomNavbar = async () => {
  const { access_token } = await getAuthServerSession();

  if (!access_token) {
    return null;
  }

  return <BottomNavbarMenu />;
};

export default BottomNavbar;
