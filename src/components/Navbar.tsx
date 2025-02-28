
import { Home, Menu, User, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Search", href: "#" },
    { label: "Apply", href: "#" },
    { label: "Resources", href: "#" },
    { label: "About", href: "#" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <Home className="w-5 h-5 text-housing-800" />
              <span className="font-display text-xl font-bold text-housing-800">
                Affordable Abode
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-housing-600 hover:text-housing-800 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="hidden md:flex items-center gap-3">
            <Link to="/signin">
              <Button variant="outline" className="bg-transparent border-housing-200 text-housing-800 hover:bg-housing-50">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-housing-800 hover:bg-housing-900 text-white">
                Get Started
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-housing-800">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <Link to="/" className="flex items-center gap-2">
                      <Home className="w-5 h-5 text-housing-800" />
                      <span className="font-display text-xl font-bold text-housing-800">
                        Affordable Abode
                      </span>
                    </Link>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="text-housing-800">
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetClose>
                  </div>
                  
                  <div className="flex flex-col space-y-4 py-4">
                    {menuItems.map((item) => (
                      <SheetClose asChild key={item.label}>
                        <Link
                          to={item.href}
                          className="px-2 py-1 text-housing-700 hover:text-housing-900 transition-colors"
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                  
                  <div className="mt-auto space-y-3 py-4">
                    <SheetClose asChild>
                      <Link to="/signin" className="w-full block">
                        <Button 
                          variant="outline" 
                          className="w-full bg-transparent border-housing-200 text-housing-800 hover:bg-housing-50"
                        >
                          Sign In
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/signup" className="w-full block">
                        <Button 
                          className="w-full bg-housing-800 hover:bg-housing-900 text-white"
                        >
                          Get Started
                        </Button>
                      </Link>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
