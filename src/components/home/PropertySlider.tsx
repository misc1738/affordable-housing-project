import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/animations/FadeIn";
import LuxuryPropertyCard from "@/components/LuxuryPropertyCard";
import { getFeaturedProperties } from "@/data/properties";

const PropertySlider = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    // Get featured and available properties
    const properties = getFeaturedProperties().filter(p => p.status === "Available");

    return (
        <section ref={containerRef} className="py-32 bg-background overflow-hidden">
            <div className="container px-4 mb-16 flex items-end justify-between">
                <FadeIn>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Featured Estates</h2>
                    <p className="text-muted-foreground text-lg max-w-xl">
                        Explore our hand-picked selection of the world's most prestigious properties.
                    </p>
                </FadeIn>
                <FadeIn delay={0.2} direction="left">
                    <Button variant="outline" className="hidden md:flex rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary">
                        View All Properties <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </FadeIn>
            </div>

            <motion.div style={{ y }} className="flex gap-8 px-4 md:px-20 w-max">
                {properties?.map((property, index) => (
                    <LuxuryPropertyCard key={property.id} property={property} index={index} className="w-[400px] md:w-[600px]" />
                ))}
            </motion.div>
        </section>
    );
};

export default PropertySlider;
