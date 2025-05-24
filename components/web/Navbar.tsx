import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { buttonVariants } from "../ui/button";
import { NavLinks } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
      <NavLinks />

      <div className="flex items-center gap-4">
        {user ? (
          <LogoutLink className={buttonVariants()}>Logout</LogoutLink>
        ) : (
          <>
            <RegisterLink className={buttonVariants()}>Register</RegisterLink>
            <LoginLink className={buttonVariants({ variant: "outline" })}>
              Login
            </LoginLink>
          </>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}
