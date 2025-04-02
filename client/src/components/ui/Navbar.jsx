import { Menu, School } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DarkMode from "@/DarkMode";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link } from "react-router";
const Navbar = () => {
  const user = true;
  return (
    <div className="h-16 dark:bg-[#020817] dark:border-b-gray-800 bg-white border-b-gray-200 fixed top-0 left-0 right-0 z-10 duration-300">
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center gap-2">
          <School size={"30"} />
          <h1 className="hidden md:block font-extrabold text-2xl">
            E-learning
          </h1>
        </div>
        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem><Link to="my-learning">My learning</Link></DropdownMenuItem>
                  <DropdownMenuItem><Link to="profile">Edit Profile</Link></DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem>Log out</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button>SignUp</Button>
              <Button>Login</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-3xl">E-learning</h1>
        <MobileNavbar className="h-px bg-gray-200 my-1" />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const role = "instructor";
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-gray-200 hover:bg-gray-200"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-5">
          <SheetTitle>E-learning</SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2" />
        <nav className="flex flex-col space-y-4">
          <span>My learning</span>
          <span>Edit Profile</span>
          <p>Log out</p>
        </nav>
        {role === "instructor" && (
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
