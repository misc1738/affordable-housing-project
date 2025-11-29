import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-background border-t border-border/40 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                                AH
                            </div>
                            <span className="text-xl font-bold tracking-tight">
                                Affordable<span className="text-primary">Housing</span>
                            </span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Making housing accessible for everyone. We connect you with affordable homes, resources, and community support to build a better future.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <SocialLink icon={Facebook} href="#" />
                            <SocialLink icon={Twitter} href="#" />
                            <SocialLink icon={Instagram} href="#" />
                            <SocialLink icon={Linkedin} href="#" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-2xl font-display font-bold text-primary mb-4">Affordable Abode</h3>
                        <p className="text-muted-foreground max-w-xs">
                            Curating the world's most exceptional properties for the discerning few.
                        </p>
                        <ul className="space-y-3 mt-4">
                            <FooterLink to="/properties">Find a Home</FooterLink>
                            <FooterLink to="/apply">How to Apply</FooterLink>
                            <FooterLink to="/resources">Resources</FooterLink>
                            <FooterLink to="/community">Community</FooterLink>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Support</h3>
                        <ul className="space-y-3">
                            <FooterLink to="/faq">FAQ</FooterLink>
                            <FooterLink to="/contact">Contact Us</FooterLink>
                            <FooterLink to="/privacy">Privacy Policy</FooterLink>
                            <FooterLink to="/terms">Terms of Service</FooterLink>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm text-muted-foreground">
                                <MapPin className="w-5 h-5 text-primary shrink-0" />
                                <span>Westlands, Nairobi<br />Kenya</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Phone className="w-5 h-5 text-primary shrink-0" />
                                <span>+254 702 005 992</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-muted-foreground">
                                <Mail className="w-5 h-5 text-primary shrink-0" />
                                <span>support@affordablehousing.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-muted-foreground text-sm">
                        © {new Date().getFullYear()} Affordable Abode. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                        <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
                        <Link to="/cookies" className="hover:text-primary transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const SocialLink = ({ icon: Icon, href }: { icon: React.ElementType, href: string }) => (
    <a
        href={href}
        className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300"
    >
        <Icon className="w-5 h-5" />
    </a>
);

const FooterLink = ({ to, children }: { to: string, children: React.ReactNode }) => (
    <li>
        <Link
            to={to}
            className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all inline-block"
        >
            {children}
        </Link>
    </li>
);

export default Footer;
