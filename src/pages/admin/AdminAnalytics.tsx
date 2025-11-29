import VisitorChart from "@/components/admin/VisitorChart";
import MetricCard from "@/components/admin/MetricCard";
import { TrendingUp, Users, Eye, MousePointerClick } from "lucide-react";

const AdminAnalytics = () => {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Reports</h1>
                <p className="text-gray-600">Track performance and gain insights into your property business.</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <MetricCard
                    title="Total Visitors"
                    value="8,945"
                    change={23}
                    icon={Users}
                    color="blue"
                    trend="up"
                />
                <MetricCard
                    title="Page Views"
                    value="32,450"
                    change={18}
                    icon={Eye}
                    color="green"
                    trend="up"
                />
                <MetricCard
                    title="Conversion Rate"
                    value="4.2%"
                    change={12}
                    icon={TrendingUp}
                    color="purple"
                    trend="up"
                />
                <MetricCard
                    title="Avg. Time on Site"
                    value="5m 32s"
                    change={8}
                    icon={MousePointerClick}
                    color="orange"
                    trend="up"
                />
            </div>

            {/* Visitor Chart */}
            <VisitorChart />

            {/* Popular Properties */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Viewed Properties</h3>
                <div className="space-y-4">
                    {[
                        { name: "Hilltop Estate", views: 1234, bookings: 45 },
                        { name: "The Glass House", views: 987, bookings: 38 },
                        { name: "Skyline Penthouse", views: 856, bookings: 32 },
                        { name: "Modern Oasis", views: 743, bookings: 28 },
                        { name: "Swahili Villa", views: 621, bookings: 24 }
                    ].map((property, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                                    {index + 1}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{property.name}</p>
                                    <p className="text-sm text-gray-500">{property.views} views • {property.bookings} bookings</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-32 bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-primary h-2 rounded-full"
                                        style={{ width: `${(property.views / 1234) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
