"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/LogoNav.png";
import { useSelector } from "react-redux";
import { User, CircleUserRound } from "lucide-react";
import type { RootState } from "@/store/store";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from "./UserMenu";

export default function ModernHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state?.user);
  const [isOpen, setIsOpen] = useState(false);

  
  // console.log("user from userState", user);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Courses", path: "/courses" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact Us", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const [openUserMenu, setOpenUserMenu] = useState(false);

  const redirectToLogin = async () => {
    navigate("/sign-in");
    setIsOpen(false);
  };

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 max-w-7xl">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={Logo} // ← Yahan apna image path dijiye
            alt="Logo"
            className="w-[150px] object-cover"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-sm font-medium transition-colors relative group ${isActive(item.path)
                  ? "text-gray-600"
                  : "text-gray-700 hover:text-gray-500"
                }`}
            >
              {item.name}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-black transition-all ${isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              ></span>
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          {/* <Button variant="ghost" size="sm" className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-black hover:to-gray-700 text-white hover:text-white">
            Sign In
          </Button> */}

          {user?.id ? (
            <div className="relative">
              <div
                onClick={() => setOpenUserMenu((preve) => !preve)}
                className="flex select-none items-center gap-1 cursor-pointer"
              >
                <p>
                  <CircleUserRound size={30} />
                </p>
                {openUserMenu ? (
                  <GoTriangleUp size={25} />
                ) : (
                  <GoTriangleDown size={25} />
                )}
              </div>
              {openUserMenu && (
                <div className="absolute right-0 top-12">
                  <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg">
                    <UserMenu
                     close={handleCloseUserMenu}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button
              size="sm"
              className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-black hover:to-gray-700 text-white"
              onClick={redirectToLogin}
            >
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] p-[20px]">
            <div className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-lg font-medium transition-colors py-2 ${isActive(item.path)
                      ? "text-gray-800"
                      : "text-gray-600 hover:text-blue-600"
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="flex flex-col space-y-3 pt-6 border-t">
                <Button
                  onClick={redirectToLogin}
                  variant="outline"
                  className="w-full text-white bg-gradient-to-r from-gray-700 to-gray-900 hover:from-black hover:to-g-700 hover:text-white"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
