import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/animations/FadeIn";
import LuxuryPropertyCard from "@/components/LuxuryPropertyCard";

const properties = [
    {
        id: 1,
        title: "The Glass House",
        location: "Karen, Nairobi",
        price: "KES 125,000,000",
        image: "/images/luxury-house-1.png",
        beds: 5,
        baths: 6,
        sqft: "6,500"
    },
    {
        id: 2,
        title: "Modern Oasis",
        location: "Muthaiga, Nairobi",
        price: "KES 89,000,000",
        image: "/images/luxury-house-2.png",
        beds: 4,
        baths: 5,
        sqft: "4,200"
    },
    {
        id: 3,
        title: "Hilltop Estate",
        location: "Runda, Nairobi",
        price: "KES 250,000,000",
        image: "/images/luxury-house-3.png",
        beds: 8,
        baths: 10,
        sqft: "12,000"
    },
    {
        id: 4,
        title: "Skyline Penthouse",
        location: "Westlands, Nairobi",
        price: "KES 180,000,000",
        image: "/images/westlands_penthouse.png",
        beds: 3,
        baths: 4,
        sqft: "4,500"
    },
    {
        id: 5,
        title: "Swahili Villa",
        location: "Lamu, Coast",
        price: "KES 95,000,000",
        image: "/images/coastal_villa.png",
        beds: 6,
        baths: 7,
        sqft: "5,800"
    }
];

const PropertySlider = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

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

            <motion.div style={{ x }} className="flex gap-8 px-4 md:px-20 w-max">
                {properties?.map((property, index) => (
                    <LuxuryPropertyCard key={property.id} property={property} index={index} className="w-[400px] md:w-[600px]" />
                ))}
            </motion.div>
        </section>
    );
};

export default PropertySlider;
