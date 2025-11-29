import Navbar from "@/components/Navbar";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto px-4 pt-24 pb-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
                    <p className="text-lg text-muted-foreground mb-8">
                        Get in touch with our team for any inquiries about our luxury properties.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <Phone className="w-6 h-6 text-primary mt-1" />
                                <div>
                                    <h3 className="font-semibold mb-1">Phone</h3>
                                    <p className="text-muted-foreground">+254 702 005 992</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Mail className="w-6 h-6 text-primary mt-1" />
                                <div>
                                    <h3 className="font-semibold mb-1">Email</h3>
                                    <p className="text-muted-foreground">support@affordablehousing.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <MapPin className="w-6 h-6 text-primary mt-1" />
                                <div>
                                    <h3 className="font-semibold mb-1">Address</h3>
                                    <p className="text-muted-foreground">Westlands, Nairobi, Kenya</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card p-6 rounded-lg border">
                            <h3 className="font-semibold mb-4">Send us a message</h3>
                            <form className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                                <textarea
                                    placeholder="Your Message"
                                    rows={4}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                                <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
