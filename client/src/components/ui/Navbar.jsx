import { School } from "lucide-react";
import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { Button } from "./button";
const Navbar = () => {
    const user=true;
  return (
    <div className="h-16 bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 z-10 duration-300">
      <div className="max-w-7xl mx-auto md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center gap-2">
          <School />
          <h1 className="hidden md:block font-extrabold text-2xl">
            E-learning
          </h1>
        </div>
        <div>
{
    user?(
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Log out
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Dashboard
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ):(
        <div className="flex items-center gap-2">
            <Button>SignUp</Button>
            <Button>Login</Button>
        </div>
    )
}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
