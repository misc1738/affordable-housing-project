import { Search, MapPin, Calendar, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => {
    return (
        <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-black">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <motion.img
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ scale: [1, 1.1], opacity: 1 }}
                    transition={{
                        scale: { duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" },
                        opacity: { duration: 1.5, ease: "easeOut" }
                    }}
                    src="/images/hero_luxury_nairobi.png"
                    alt="Luxury Mansion"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="container relative z-10 px-4 h-full flex flex-col justify-center pt-20">
                <div className="max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-lg animate-tracking-in-expand-fwd"
                    >
                        Discover Your <br />
                        <span className="text-primary italic">Sanctuary</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl font-light drop-shadow-md"
                    >
                        Experience the pinnacle of modern living with our curated collection of exclusive estates.
                    </motion.p>

                    {/* Floating Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="glass-card p-4 rounded-full max-w-3xl flex flex-col md:flex-row items-center gap-4 shadow-2xl backdrop-blur-3xl border-white/20"
                    >
                        <div className="flex-1 w-full md:w-auto flex items-center gap-3 px-4 border-b md:border-b-0 md:border-r border-gray-200/20 pb-4 md:pb-0">
                            <MapPin className="text-primary w-5 h-5" />
                            <div className="flex flex-col w-full">
                                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Location</span>
                                <input
                                    type="text"
                                    placeholder="Nairobi, Kenya"
                                    className="bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/70 font-medium w-full"
                                />
                            </div>
                        </div>

                        <div className="flex-1 w-full md:w-auto flex items-center gap-3 px-4 border-b md:border-b-0 md:border-r border-gray-200/20 pb-4 md:pb-0">
                            <Home className="text-primary w-5 h-5" />
                            <div className="flex flex-col w-full">
                                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Type</span>
                                <select className="bg-transparent border-none outline-none text-foreground font-medium w-full appearance-none cursor-pointer">
                                    <option>Villa</option>
                                    <option>Mansion</option>
                                    <option>Penthouse</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex-1 w-full md:w-auto flex items-center gap-3 px-4 pb-4 md:pb-0">
                            <Calendar className="text-primary w-5 h-5" />
                            <div className="flex flex-col w-full">
                                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">When</span>
                                <span className="text-foreground font-medium cursor-pointer">Anytime</span>
                            </div>
                        </div>

                        <Button size="lg" className="rounded-full w-full md:w-auto h-14 px-8 bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-primary/25 transition-all">
                            <Search className="w-5 h-5 mr-2" />
                            Search
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 right-10 flex flex-col items-center gap-4 text-white/80"
            >
                <span className="text-sm font-medium tracking-widest uppercase rotate-90 origin-right translate-x-2">Scroll</span>
                <div className="w-[1px] h-20 bg-white/30 overflow-hidden">
                    <motion.div
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-full h-1/2 bg-white"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
