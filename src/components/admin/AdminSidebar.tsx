import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Home,
    Calendar,
    BarChart3,
    Settings,
    User
} from "lucide-react";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Home, label: "Properties", path: "/admin/properties" },
    { icon: Calendar, label: "Bookings", path: "/admin/bookings" },
    { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
];

const AdminSidebar = () => {
    const location = useLocation();

    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                        AA
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">
                            Affordable<span className="text-primary">Abode</span>
                        </h1>
                        <p className="text-xs text-muted-foreground">Admin Panel</p>
                    </div>
                </div>
            </div>

            {/* Main Menu */}
            <nav className="flex-1 p-4">
                <div className="space-y-1">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
                        Main Menu
                    </p>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${isActive
                                        ? "bg-primary text-white shadow-sm"
                                        : "text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                        <User className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">Admin User</p>
                        <p className="text-xs text-gray-500 truncate">admin@affordableabode.com</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default AdminSidebar;
