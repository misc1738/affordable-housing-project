import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
    { month: "Jan", visitors: 245, bookings: 12, views: 1200 },
    { month: "Feb", visitors: 312, bookings: 18, views: 1450 },
    { month: "Mar", visitors: 428, bookings: 24, views: 1890 },
    { month: "Apr", visitors: 502, bookings: 32, views: 2100 },
    { month: "May", visitors: 589, bookings: 28, views: 2350 },
    { month: "Jun", visitors: 625, bookings: 35, views: 2580 },
    { month: "Jul", visitors: 712, bookings: 42, views: 2890 },
    { month: "Aug", visitors: 698, bookings: 38, views: 2750 },
    { month: "Sep", visitors: 756, bookings: 45, views: 3100 },
    { month: "Oct", visitors: 834, bookings: 52, views: 3450 },
    { month: "Nov", visitors: 892, bookings: 48, views: 3680 },
    { month: "Dec", visitors: 945, bookings: 58, views: 3920 }
];

const VisitorChart = () => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Visitor Statistics</h3>
                    <p className="text-sm text-gray-500">Monthly trends for 2025</p>
                </div>
                <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option>Monthly</option>
                    <option>Weekly</option>
                    <option>Daily</option>
                </select>
            </div>

            <ResponsiveContainer width="100%" height={350}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                        dataKey="month"
                        stroke="#9ca3af"
                        style={{ fontSize: '12px' }}
                    />
                    <YAxis
                        stroke="#9ca3af"
                        style={{ fontSize: '12px' }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            padding: '12px'
                        }}
                    />
                    <Legend
                        wrapperStyle={{ paddingTop: '20px' }}
                        iconType="circle"
                    />
                    <Line
                        type="monotone"
                        dataKey="visitors"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ fill: '#3b82f6', r: 4 }}
                        activeDot={{ r: 6 }}
                        name="Visitors"
                    />
                    <Line
                        type="monotone"
                        dataKey="bookings"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ fill: '#10b981', r: 4 }}
                        activeDot={{ r: 6 }}
                        name="Bookings"
                    />
                    <Line
                        type="monotone"
                        dataKey="views"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        dot={{ fill: '#f59e0b', r: 4 }}
                        activeDot={{ r: 6 }}
                        name="Property Views"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default VisitorChart;
