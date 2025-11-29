import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, MapPin, Phone, Mail, Search } from "lucide-react";

export interface Booking {
    id: number;
    name: string;
    email: string;
    phone: string;
    propertyName: string;
    date: string;
    time: string;
    status: "Pending" | "Confirmed" | "Cancelled" | "Completed";
    createdAt: string;
}

interface BookingTableProps {
    bookings: Booking[];
    onStatusChange: (id: number, status: Booking["status"]) => void;
}

const BookingTable = ({ bookings, onStatusChange }: BookingTableProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("all");

    const filteredBookings = bookings.filter(booking => {
        const matchesSearch =
            booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filterStatus === "all" || booking.status === filterStatus;

        return matchesSearch && matchesFilter;
    });

    const getStatusColor = (status: Booking["status"]) => {
        switch (status) {
            case "Confirmed":
                return "bg-green-100 text-green-800";
            case "Pending":
                return "bg-yellow-100 text-yellow-800";
            case "Cancelled":
                return "bg-red-100 text-red-800";
            case "Completed":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="space-y-4">
            {/* Search and Filter */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search bookings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                </div>
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                    <option value="all">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Client</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Property</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Date & Time</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredBookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                                                {booking.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{booking.name}</p>
                                                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                                    <span className="flex items-center gap-1">
                                                        <Mail className="w-3 h-3" />
                                                        {booking.email}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Phone className="w-3 h-3" />
                                                        {booking.phone}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <MapPin className="w-4 h-4 text-gray-400" />
                                            {booking.propertyName}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-gray-900">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                {booking.date}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Clock className="w-4 h-4 text-gray-400" />
                                                {booking.time}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            {booking.status === "Pending" && (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        className="h-8"
                                                        onClick={() => onStatusChange(booking.id, "Confirmed")}
                                                    >
                                                        Confirm
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="h-8"
                                                        onClick={() => onStatusChange(booking.id, "Cancelled")}
                                                    >
                                                        Decline
                                                    </Button>
                                                </>
                                            )}
                                            {booking.status === "Confirmed" && (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="h-8"
                                                    onClick={() => onStatusChange(booking.id, "Completed")}
                                                >
                                                    Mark Complete
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredBookings.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No bookings found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingTable;
