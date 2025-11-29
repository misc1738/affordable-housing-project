import React from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import BookingModal from "./BookingModal";

export interface LuxuryProperty {
    id: number;
    title: string;
    location: string;
    price: string | number;
    image: string;
    beds: number;
    baths: number;
    sqft: string;
    type?: string;
}

interface LuxuryPropertyCardProps {
    property: LuxuryProperty;
    index?: number;
    className?: string;
}

const LuxuryPropertyCard = ({ property, index = 0, className = "" }: LuxuryPropertyCardProps) => {
    return (
        <div className={`group relative h-[500px] rounded-[2rem] overflow-hidden cursor-pointer ${className}`}>
            <Link to={`/property/${property.id}`} className="block w-full h-full">
                <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-8 pt-0 text-white z-10">
                    <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 delay-100">
                        <BookingModal
                            propertyName={property.title}
                            trigger={
                                <Button className="flex-1 bg-gold text-black hover:bg-gold/90 border-none">
                                    Book Viewing
                                </Button>
                            }
                        />
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-2xl md:text-3xl font-display font-bold mb-2 leading-tight">{property.title}</h3>
                </div>
            </Link>
        </div>
    );
};

export default LuxuryPropertyCard;
