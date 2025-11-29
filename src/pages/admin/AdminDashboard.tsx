import MetricCard from "@/components/admin/MetricCard";
import { Home, Calendar, DollarSign, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                <p className="text-gray-600">Welcome back! Here's what's happening with your properties.</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    title="Total Properties"
                    value="24"
                    change={12}
                    icon={Home}
                    color="blue"
                    trend="up"
                />
                <MetricCard
                    title="Active Listings"
                    value="18"
                    change={8}
                    icon={TrendingUp}
                    color="green"
                    trend="up"
                />
                <MetricCard
                    title="New Bookings"
                    value="42"
                    change={20}
                    icon={Calendar}
                    color="orange"
                    trend="up"
                />
                <MetricCard
                    title="Total Revenue"
                    value="KES 450M"
                    change={15}
                    icon={DollarSign}
                    color="purple"
                    trend="up"
                />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Bookings</h2>
                <div className="space-y-4">
                    {[
                        { name: "James Mwangi", property: "The Glass House", date: "2025-01-15", time: "10:00 AM", status: "Confirmed" },
                        { name: "Sarah Njeri", property: "Modern Oasis", date: "2025-01-16", time: "2:00 PM", status: "Pending" },
                        { name: "David Kamau", property: "Hilltop Estate", date: "2025-01-17", time: "11:00 AM", status: "Confirmed" },
                    ].map((booking, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                                    {booking.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{booking.name}</p>
                                    <p className="text-sm text-gray-600">{booking.property}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">{booking.date}</p>
                                    <p className="text-xs text-gray-600">{booking.time}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === "Confirmed"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}>
                                    {booking.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
