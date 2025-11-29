import { useState } from "react";
import PropertyTable from "@/components/admin/PropertyTable";
import { LuxuryProperty } from "@/components/LuxuryPropertyCard";
import MetricCard from "@/components/admin/MetricCard";
import { Home, TrendingUp, DollarSign, Eye } from "lucide-react";

// Import properties from the main properties data
const initialProperties: LuxuryProperty[] = [
    {
        id: 1,
        title: "The Glass House",
        location: "Karen, Nairobi",
        price: 125000000,
        image: "/images/luxury-house-1.png",
        beds: 5,
        baths: 6,
        sqft: "6,500",
        type: "Villa"
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
        type: "Mansion"
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
        type: "Estate"
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
        type: "Penthouse"
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
        type: "Villa"
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
        type: "Apartment"
    }
];

const AdminProperties = () => {
    const [properties, setProperties] = useState<LuxuryProperty[]>(initialProperties);

    const handleEdit = (property: LuxuryProperty) => {
        console.log("Edit property:", property);
        // TODO: Open edit modal
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this property?")) {
            setProperties(properties.filter(p => p.id !== id));
        }
    };

    const totalValue = properties.reduce((sum, p) => sum + (typeof p.price === 'number' ? p.price : 0), 0);
    const availableCount = properties.filter((_, i) => i % 3 === 0).length;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Property Management</h1>
                <p className="text-gray-600">Manage all your luxury properties from here.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <MetricCard
                    title="Total Properties"
                    value={properties.length}
                    icon={Home}
                    color="blue"
                />
                <MetricCard
                    title="Available"
                    value={availableCount}
                    icon={TrendingUp}
                    color="green"
                />
                <MetricCard
                    title="Total Value"
                    value={`KES ${(totalValue / 1000000).toFixed(0)}M`}
                    icon={DollarSign}
                    color="purple"
                />
                <MetricCard
                    title="Total Views"
                    value="1,234"
                    icon={Eye}
                    color="orange"
                />
            </div>

            {/* Property Table */}
            <PropertyTable
                properties={properties}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default AdminProperties;
