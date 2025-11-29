import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Info, Phone, User, Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Explore", path: "/properties", icon: Search },
    { name: "Locations", path: "/neighborhoods", icon: MapPin },
    { name: "Contact", path: "/contact", icon: Phone },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-in-out",
        scrolled ? "glass-nav py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 45 }}
            transition={{ duration: 0.5 }}
            className="w-10 h-10 border-2 border-primary rounded-full flex items-center justify-center text-primary font-bold text-xl shadow-lg bg-white/10 backdrop-blur-md"
          >
            M
          </motion.div>
          <span className={cn("text-2xl font-display font-bold tracking-tight transition-colors", scrolled ? "text-foreground" : "text-white")}>
            Affordable Abode
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          <div className="glass-card px-2 py-1.5 rounded-full flex items-center gap-1 mr-4 bg-white/10 border-white/20">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all relative",
                  location.pathname === link.path
                    ? "text-foreground bg-white shadow-sm"
                    : scrolled ? "text-foreground/80 hover:bg-black/5" : "text-white/90 hover:bg-white/10"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button size="icon" variant="ghost" className="rounded-full w-10 h-10 bg-white/10 hover:bg-white/20 text-white border border-white/20">
              <Search className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" className="rounded-full w-10 h-10 bg-white/10 hover:bg-white/20 text-white border border-white/20">
              <User className="w-4 h-4" />
            </Button>
            <Link to="/properties">
              <Button className="rounded-full bg-primary hover:bg-primary/90 text-white px-6 shadow-lg hover:shadow-primary/25 transition-all">
                Listings
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu className={scrolled ? "text-foreground" : "text-white"} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border/40 overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <link.icon className="w-5 h-5 text-primary" />
                    <span className="font-medium">{link.name}</span>
                  </Link>
                </motion.div>
              ))}
              <div className="h-px bg-border my-2" />
              <Link to="/signin" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full justify-start gap-2 rounded-full">
                  <User className="w-4 h-4" />
                  Sign In
                </Button>
              </Link>
              <Link to="/properties" onClick={() => setIsOpen(false)}>
                <Button className="w-full rounded-full">View Listings</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
