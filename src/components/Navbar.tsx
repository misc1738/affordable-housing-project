
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Bell, Menu, Search, User } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      } transition-all duration-300`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="font-display text-xl font-bold text-housing-800">
                {t('app_name')}
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-housing-700 hover:text-housing-900">
              {t('nav_home')}
            </Link>
            <Link to="/properties" className="text-housing-700 hover:text-housing-900">
              {t('nav_search')}
            </Link>
            <Link to="/apply" className="text-housing-700 hover:text-housing-900">
              {t('nav_apply')}
            </Link>
            <Link to="/resources" className="text-housing-700 hover:text-housing-900">
              {t('nav_resources')}
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="text-housing-700">
                <Bell className="h-5 w-5" />
              </Button>
              <Link to="/signin">
                <Button variant="outline" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  {t('nav_signin')}
                </Button>
              </Link>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-housing-700"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle className="font-display text-housing-800">
                    {t('app_name')}
                  </SheetTitle>
                </SheetHeader>
                <div className="py-6">
                  <div className="relative w-full mb-6">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-housing-400" />
                    <Input
                      placeholder={t('hero_search_placeholder')}
                      className="pl-8"
                    />
                  </div>
                  <div className="space-y-3">
                    <Link
                      to="/"
                      className="block py-2 px-3 rounded-md hover:bg-housing-50 text-housing-800"
                    >
                      {t('nav_home')}
                    </Link>
                    <Link
                      to="/properties"
                      className="block py-2 px-3 rounded-md hover:bg-housing-50 text-housing-800"
                    >
                      {t('nav_search')}
                    </Link>
                    <Link
                      to="/apply"
                      className="block py-2 px-3 rounded-md hover:bg-housing-50 text-housing-800"
                    >
                      {t('nav_apply')}
                    </Link>
                    <Link
                      to="/resources"
                      className="block py-2 px-3 rounded-md hover:bg-housing-50 text-housing-800"
                    >
                      {t('nav_resources')}
                    </Link>
                  </div>
                  <div className="pt-6 mt-6 border-t border-gray-200">
                    <Link to="/signin">
                      <Button className="w-full mb-2 bg-housing-800 hover:bg-housing-900">
                        {t('nav_signin')}
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button variant="outline" className="w-full">
                        {t('nav_signup')}
                      </Button>
                    </Link>
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
