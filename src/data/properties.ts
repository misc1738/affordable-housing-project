import { LuxuryProperty } from "@/components/LuxuryPropertyCard";

export type PropertyStatus = "Available" | "Pending" | "Sold" | "Off-Market";

export interface PropertyWithStatus extends LuxuryProperty {
    status: PropertyStatus;
    featured?: boolean;
    views?: number;
    createdAt?: string;
}

// Centralized property data - shared between admin and webapp
export const PROPERTIES: PropertyWithStatus[] = [
    {
        id: 1,
        title: "The Glass House",
        location: "Karen, Nairobi",
        price: 125000000,
        image: "/images/luxury-house-1.png",
        beds: 5,
        baths: 6,
        sqft: "6,500",
        type: "Villa",
        status: "Available",
        featured: true,
        views: 1234
    },
    {
        id: 2,
        title: "Modern Oasis",
        location: "Muthaiga, Nairobi",
        price: 89000000,
        image: "/images/luxury-house-2.png",
        beds: 4,
        baths: 5,
        sqft: "4,200",
        type: "Mansion",
        status: "Available",
        featured: true,
        views: 987
    },
    {
        id: 3,
        title: "Hilltop Estate",
        location: "Runda, Nairobi",
        price: 250000000,
        image: "/images/luxury-house-3.png",
        beds: 8,
        baths: 10,
        sqft: "12,000",
        type: "Estate",
        status: "Pending",
        featured: true,
        views: 1890
    },
    {
        id: 4,
        title: "Skyline Penthouse",
        location: "Westlands, Nairobi",
        price: 180000000,
        image: "/images/westlands_penthouse.png",
        beds: 3,
        baths: 4,
        sqft: "4,500",
        type: "Penthouse",
        status: "Available",
        featured: true,
        views: 856
    },
    {
        id: 5,
        title: "Swahili Villa",
        location: "Lamu, Coast",
        price: 95000000,
        image: "/images/coastal_villa.png",
        beds: 6,
        baths: 7,
        sqft: "5,800",
        type: "Villa",
        status: "Available",
        featured: true,
        views: 621
    },
    {
        id: 6,
        title: "Riverside Retreat",
        location: "Riverside, Nairobi",
        price: 65000000,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        beds: 3,
        baths: 3,
        sqft: "3,200",
        type: "Apartment",
        status: "Available",
        views: 543
    },
    {
        id: 7,
        title: "Garden Estate Villa",
        location: "Lavington, Nairobi",
        price: 145000000,
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80",
        beds: 5,
        baths: 5,
        sqft: "5,500",
        type: "Villa",
        status: "Available",
        views: 432
    },
    {
        id: 8,
        title: "Coastal Paradise",
        location: "Diani, Coast",
        price: 78000000,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        beds: 4,
        baths: 4,
        sqft: "4,800",
        type: "Beach House",
        status: "Available",
        views: 678
    },
    {
        id: 9,
        title: "Urban Loft",
        location: "Kilimani, Nairobi",
        price: 55000000,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1475&q=80",
        beds: 2,
        baths: 2,
        sqft: "2,800",
        type: "Loft",
        status: "Sold",
        views: 234
    },
    {
        id: 10,
        title: "Executive Townhouse",
        location: "Spring Valley, Nairobi",
        price: 98000000,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1453&q=80",
        beds: 4,
        baths: 4,
        sqft: "4,000",
        type: "Townhouse",
        status: "Available",
        views: 567
    },
    {
        id: 11,
        title: "Serene Gardens",
        location: "Gigiri, Nairobi",
        price: 135000000,
        image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        beds: 5,
        baths: 6,
        sqft: "6,200",
        type: "Mansion",
        status: "Available",
        views: 789
    },
    {
        id: 12,
        title: "Lake View Estate",
        location: "Naivasha",
        price: 175000000,
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        beds: 6,
        baths: 7,
        sqft: "7,500",
        type: "Estate",
        status: "Pending",
        views: 456
    },
    {
        id: 13,
        title: "Contemporary Apartment",
        location: "Upper Hill, Nairobi",
        price: 48000000,
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        beds: 3,
        baths: 3,
        sqft: "3,000",
        type: "Apartment",
        status: "Available",
        views: 345
    },
    {
        id: 14,
        title: "Mountain View Retreat",
        location: "Tigoni",
        price: 92000000,
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        beds: 4,
        baths: 4,
        sqft: "4,500",
        type: "Villa",
        status: "Available",
        views: 298
    },
    {
        id: 15,
        title: "Luxury Duplex",
        location: "Parklands, Nairobi",
        price: 72000000,
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
        beds: 4,
        baths: 4,
        sqft: "3,800",
        type: "Duplex",
        status: "Available",
        views: 412
    }
];

// Helper functions
export const getPropertyById = (id: number): PropertyWithStatus | undefined => {
    return PROPERTIES.find(p => p.id === id);
};

export const getAvailableProperties = (): PropertyWithStatus[] => {
    return PROPERTIES.filter(p => p.status === "Available");
};

export const getFeaturedProperties = (): PropertyWithStatus[] => {
    return PROPERTIES.filter(p => p.featured === true);
};

export const getPropertiesByStatus = (status: PropertyStatus): PropertyWithStatus[] => {
    return PROPERTIES.filter(p => p.status === status);
};

export default PROPERTIES;
