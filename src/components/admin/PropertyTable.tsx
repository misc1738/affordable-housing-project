import { useState } from "react";
import { LuxuryProperty } from "@/components/LuxuryPropertyCard";
import { PropertyWithStatus, PropertyStatus } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface PropertyTableProps {
    properties: PropertyWithStatus[];
    onEdit: (property: PropertyWithStatus) => void;
    onDelete: (id: number) => void;
    onStatusChange?: (id: number, status: PropertyStatus) => void;
}

const PropertyTable = ({ properties, onEdit, onDelete, onStatusChange }: PropertyTableProps) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProperties = properties.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: PropertyStatus) => {
        switch (status) {
            case "Available":
                return "bg-green-100 text-green-800";
            case "Pending":
                return "bg-yellow-100 text-yellow-800";
            case "Sold":
                return "bg-gray-100 text-gray-800";
            case "Off-Market":
                return "bg-red-100 text-red-800";
            default:
                return "bg-blue-100 text-blue-800";
        }
    };

    return (
        <div className="space-y-4">
            {/* Search and Add */}
            <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search properties..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                </div>
                <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Property
                </Button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Property</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Location</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Price</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Details</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredProperties.map((property) => (
                                <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={property.image}
                                                alt={property.title}
                                                className="w-16 h-16 rounded-lg object-cover"
                                            />
                                            <div>
                                                <p className="font-semibold text-gray-900">{property.title}</p>
                                                <p className="text-sm text-gray-500">ID: {property.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">{property.location}</td>
                                    <td className="px-6 py-4">
                                        <p className="font-semibold text-gray-900">
                                            {typeof property.price === 'number'
                                                ? `KES ${(property.price / 1000000).toFixed(1)}M`
                                                : property.price
                                            }
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-600">
                                            {property.beds} beds • {property.baths} baths • {property.sqft} sqft
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={property.status}
                                            onChange={(e) => onStatusChange?.(property.id, e.target.value as PropertyStatus)}
                                            className={`px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${getStatusColor(property.status)}`}
                                        >
                                            <option value="Available">Available</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Sold">Sold</option>
                                            <option value="Off-Market">Off-Market</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link to={`/property/${property.id}`} target="_blank">
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                                onClick={() => onEdit(property)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                onClick={() => onDelete(property.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredProperties.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No properties found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PropertyTable;
