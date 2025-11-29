import Navbar from "@/components/Navbar";

const Privacy = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto px-4 pt-24 pb-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
                    <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

                    <div className="prose prose-lg max-w-none space-y-6">
                        <section>
                            <h2 className="text-2xl font-semibold mb-3">Information We Collect</h2>
                            <p className="text-muted-foreground">
                                We collect information you provide directly to us, including name, email address, phone number,
                                and any other information you choose to provide when using our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">How We Use Your Information</h2>
                            <p className="text-muted-foreground">
                                We use the information we collect to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-2">
                                <li>Process your property applications</li>
                                <li>Communicate with you about our services</li>
                                <li>Improve our platform and user experience</li>
                                <li>Send you updates about properties you're interested in</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">Data Security</h2>
                            <p className="text-muted-foreground">
                                We implement appropriate security measures to protect your personal information from unauthorized
                                access, alteration, disclosure, or destruction.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">Your Rights</h2>
                            <p className="text-muted-foreground">
                                You have the right to access, update, or delete your personal information at any time.
                                Contact us at support@affordablehousing.com for any privacy-related requests.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
                            <p className="text-muted-foreground">
                                If you have any questions about this Privacy Policy, please contact us at support@affordablehousing.com
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
