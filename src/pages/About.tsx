import Navbar from "@/components/Navbar";

const About = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto px-4 pt-24 pb-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6">About Affordable Abode</h1>

                    <div className="prose prose-lg max-w-none">
                        <p className="text-lg text-muted-foreground mb-6">
                            Affordable Abode is Kenya's premier luxury property platform, connecting discerning clients
                            with the finest estates across the country.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
                        <p className="text-muted-foreground mb-6">
                            To provide exceptional luxury properties and unparalleled service to our clients,
                            making the dream of owning a prestigious home a reality.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose Us</h2>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                            <li>Curated selection of premium properties</li>
                            <li>Expert guidance throughout the buying process</li>
                            <li>Transparent pricing and documentation</li>
                            <li>24/7 customer support</li>
                            <li>Verified property listings</li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
                        <p className="text-muted-foreground">
                            Excellence, Integrity, and Client Satisfaction are at the core of everything we do.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
