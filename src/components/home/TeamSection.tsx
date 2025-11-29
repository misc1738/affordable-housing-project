import React from 'react';
import FadeIn from '../animations/FadeIn';
import { Card, CardContent } from '../ui/card';
import { Phone, Mail, Linkedin } from 'lucide-react';

const teamMembers = [
    {
        id: 1,
        name: "Sarah Kamau",
        role: "Senior Luxury Consultant",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400",
        phone: "+254 700 123 456",
        email: "sarah@affordableabode.co.ke"
    },
    {
        id: 2,
        name: "David Ochieng",
        role: "Head of Sales",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400",
        phone: "+254 700 654 321",
        email: "david@affordableabode.co.ke"
    },
    {
        id: 3,
        name: "Grace Wanjiku",
        role: "Client Relations Manager",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400",
        phone: "+254 700 987 654",
        email: "grace@affordableabode.co.ke"
    }
];

const TeamSection = () => {
    return (
        <section className="py-24 bg-secondary/5">
            <div className="container px-4">
                <FadeIn>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            Meet Your <span className="text-gold">Concierge Team</span>
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Our dedicated experts are here to guide you through every step of your luxury property journey.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid md:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <FadeIn key={member.id} delay={index * 0.1}>
                            <Card className="bg-background border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                                <div className="relative h-80 overflow-hidden">
                                    <div className="absolute inset-0 bg-gold/10 group-hover:bg-gold/0 transition-colors duration-300 z-10" />
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <CardContent className="p-6 text-center relative">
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white p-3 rounded-full shadow-lg z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                                        <div className="flex gap-3">
                                            <a href={`tel:${member.phone}`} className="text-gray-600 hover:text-gold transition-colors">
                                                <Phone className="w-5 h-5" />
                                            </a>
                                            <a href={`mailto:${member.email}`} className="text-gray-600 hover:text-gold transition-colors">
                                                <Mail className="w-5 h-5" />
                                            </a>
                                            <a href="#" className="text-gray-600 hover:text-gold transition-colors">
                                                <Linkedin className="w-5 h-5" />
                                            </a>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-display font-bold mb-1">{member.name}</h3>
                                    <p className="text-gold font-medium mb-4">{member.role}</p>
                                    <p className="text-sm text-muted-foreground">
                                        Dedicated to finding your perfect home in Nairobi's most prestigious neighborhoods.
                                    </p>
                                </CardContent>
                            </Card>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
