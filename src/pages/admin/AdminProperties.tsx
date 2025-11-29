import { useState } from "react";
import PropertyTable from "@/components/admin/PropertyTable";
import { LuxuryProperty } from "@/components/LuxuryPropertyCard";
import MetricCard from "@/components/admin/MetricCard";
import { Home, TrendingUp, DollarSign, Eye, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generatePdf } from "@/lib/api-services";
import PROPERTIES, { PropertyWithStatus } from "@/data/properties";

const AdminProperties = () => {
    const [properties, setProperties] = useState<PropertyWithStatus[]>(PROPERTIES);

    const handleEdit = (property: PropertyWithStatus) => {
        console.log("Edit property:", property);
        // TODO: Open edit modal
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this property?")) {
            setProperties(properties.filter(p => p.id !== id));
        }
    };

    const handleStatusChange = (id: number, status: PropertyStatus) => {
        setProperties(properties.map(p =>
            p.id === id ? { ...p, status } : p
        ));
    };

    const totalValue = properties.reduce((sum, p) => sum + (typeof p.price === 'number' ? p.price : 0), 0);
    const availableCount = properties.filter(p => p.status === "Available").length;
    const totalViews = properties.reduce((sum, p) => sum + (p.views || 0), 0);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Property Management</h1>
                    <p className="text-gray-600">Manage all your luxury properties from here.</p>
                </div>
                <Button
                    onClick={async () => {
                        const htmlContent = `
                            <!DOCTYPE html>
                            <html>
                            <head>
                                <style>
                                    body { font-family: Arial; padding: 40px; }
                                    h1 { color: #D4AF37; }
                                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                                    th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                                    th { background: #f5f5f5; }
                                </style>
                            </head>
                            <body>
                                <h1>Property Portfolio Report</h1>
                                <p>Generated on: ${new Date().toLocaleDateString()}</p>
                                <p><strong>Total Properties:</strong> ${properties.length}</p>
                                <p><strong>Total Value:</strong> KES ${(totalValue / 1000000).toFixed(1)}M</p>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Property</th>
                                            <th>Location</th>
                                            <th>Type</th>
                                            <th>Price</th>
                                            <th>Beds/Baths</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${properties.map(p => `
                                            <tr>
                                                <td>${p.title}</td>
                                                <td>${p.location}</td>
                                                <td>${p.type}</td>
                                                <td>KES ${typeof p.price === 'number' ? (p.price / 1000000).toFixed(1) + 'M' : p.price}</td>
                                                <td>${p.beds}/${p.baths}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </body>
                            </html>
                        `;
                        const pdf = await generatePdf(htmlContent);
                        if (pdf) {
                            const url = URL.createObjectURL(pdf);
                            const link = document.createElement('a');
                            link.href = url;
                            link.download = `Property-Portfolio-${new Date().toISOString().split('T')[0]}.pdf`;
                            link.click();
                            URL.revokeObjectURL(url);
                        }
                    }}
                    className="gap-2"
                >
                    <FileDown className="w-4 h-4" />
                    Export to PDF
                </Button>
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
                    value={totalViews.toLocaleString()}
                    icon={Eye}
                    color="orange"
                />
            </div>

            {/* Property Table */}
            <PropertyTable
                properties={properties}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
            />
        </div>
    );
};

export default AdminProperties;
