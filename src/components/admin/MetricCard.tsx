import { LucideIcon } from "lucide-react";

interface MetricCardProps {
    title: string;
    value: string | number;
    change?: number;
    icon: LucideIcon;
    trend?: "up" | "down";
    color?: "blue" | "orange" | "green" | "purple";
}

const colorClasses = {
    blue: "bg-blue-500",
    orange: "bg-orange-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
};

const MetricCard = ({ title, value, change, icon: Icon, trend = "up", color = "blue" }: MetricCardProps) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-sm text-gray-600 mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
                </div>
                <div className={`w-12 h-12 rounded-full ${colorClasses[color]} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>

            {change !== undefined && (
                <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${trend === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                        {trend === "up" ? "↑" : "↓"} {Math.abs(change)}%
                    </span>
                    <span className="text-xs text-gray-500">vs last month</span>
                </div>
            )}
        </div>
    );
};

export default MetricCard;
