import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BookingModalProps {
    trigger?: React.ReactNode;
    propertyName?: string;
}

const BookingModal = ({ trigger, propertyName = "Luxury Property" }: BookingModalProps) => {
    const { toast } = useToast();
    const [open, setOpen] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setOpen(false);
        toast({
            title: "Viewing Scheduled",
            description: "One of our concierge agents will contact you shortly to confirm.",
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || <Button className="bg-gold text-black hover:bg-gold/90">Schedule Viewing</Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] border-gold/20">
                <DialogHeader>
                    <DialogTitle className="font-display text-2xl text-center">Schedule a Private Viewing</DialogTitle>
                    <DialogDescription className="text-center">
                        Experience {propertyName} in person. Fill out the form below.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="John Doe" required className="border-gold/20 focus:border-gold" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="john@example.com" required className="border-gold/20 focus:border-gold" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="+254 700 000 000" required className="border-gold/20 focus:border-gold" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="date">Preferred Date</Label>
                            <div className="relative">
                                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                                <Input id="date" type="date" required className="pl-9 border-gold/20 focus:border-gold" />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="time">Preferred Time</Label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                                <Input id="time" type="time" required className="pl-9 border-gold/20 focus:border-gold" />
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="message">Additional Requests</Label>
                        <Textarea id="message" placeholder="Any specific requirements?" className="border-gold/20 focus:border-gold" />
                    </div>
                    <Button type="submit" className="w-full bg-gold text-black hover:bg-gold/90 font-semibold mt-2">
                        Confirm Booking
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default BookingModal;
