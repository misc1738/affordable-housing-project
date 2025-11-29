import { useState } from "react";
import BookingTable, { Booking } from "@/components/admin/BookingTable";
import MetricCard from "@/components/admin/MetricCard";
import { Calendar, CheckCircle, XCircle, Clock } from "lucide-react";

// Mock booking data
const initialBookings: Booking[] = [
    {
        id: 1,
        name: "James Mwangi",
        email: "james.mwangi@example.com",
        phone: "+254 712 345 678",
        propertyName: "The Glass House",
        date: "2025-01-15",
        time: "10:00 AM",
        status: "Confirmed",
        createdAt: "2025-01-10"
    },
    {
        id: 2,
        name: "Sarah Njeri",
        email: "sarah.njeri@example.com",
        phone: "+254 723 456 789",
        propertyName: "Modern Oasis",
        date: "2025-01-16",
        time: "2:00 PM",
        status: "Pending",
        createdAt: "2025-01-11"
    },
    {
        id: 3,
        name: "David Kamau",
        email: "david.kamau@example.com",
        phone: "+254 734 567 890",
        propertyName: "Hilltop Estate",
        date: "2025-01-17",
        time: "11:00 AM",
        status: "Confirmed",
        createdAt: "2025-01-12"
    },
    {
        id: 4,
        name: "Grace Wanjiru",
        email: "grace.w@example.com",
        phone: "+254 745 678 901",
        propertyName: "Skyline Penthouse",
        date: "2025-01-18",
        time: "3:00 PM",
        status: "Pending",
        createdAt: "2025-01-13"
    },
    {
        id: 5,
        name: "Peter Omondi",
        email: "peter.o@example.com",
        phone: "+254 756 789 012",
        propertyName: "Swahili Villa",
        date: "2025-01-14",
        time: "9:00 AM",
        status: "Completed",
        createdAt: "2025-01-08"
    },
    {
        id: 6,
        name: "Lucy Akinyi",
        email: "lucy.akinyi@example.com",
        phone: "+254 767 890 123",
        propertyName: "Riverside Retreat",
        date: "2025-01-13",
        time: "1:00 PM",
        status: "Cancelled",
        createdAt: "2025-01-09"
    }
];

const AdminBookings = () => {
    const [bookings, setBookings] = useState<Booking[]>(initialBookings);

    const handleStatusChange = (id: number, status: Booking["status"]) => {
        setBookings(bookings.map(booking =>
            booking.id === id ? { ...booking, status } : booking
        ));
    };

    const pendingCount = bookings.filter(b => b.status === "Pending").length;
    const confirmedCount = bookings.filter(b => b.status === "Confirmed").length;
    const completedCount = bookings.filter(b => b.status === "Completed").length;
    const cancelledCount = bookings.filter(b => b.status === "Cancelled").length;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Management</h1>
                <p className="text-gray-600">View and manage all property viewing requests.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <MetricCard
                    title="Pending"
                    value={pendingCount}
                    icon={Clock}
                    color="orange"
                />
                <MetricCard
                    title="Confirmed"
                    value={confirmedCount}
                    icon={CheckCircle}
                    color="green"
                />
                <MetricCard
                    title="Completed"
                    value={completedCount}
                    icon={Calendar}
                    color="blue"
                />
                <MetricCard
                    title="Cancelled"
                    value={cancelledCount}
                    icon={XCircle}
                    color="purple"
                />
            </div>

            {/* Booking Table */}
            <BookingTable
                bookings={bookings}
                onStatusChange={handleStatusChange}
            />
        </div>
    );
};

export default AdminBookings;
