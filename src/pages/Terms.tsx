import Navbar from "@/components/Navbar";

const Terms = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto px-4 pt-24 pb-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
                    <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

                    <div className="prose prose-lg max-w-none space-y-6">
                        <section>
                            <h2 className="text-2xl font-semibold mb-3">Acceptance of Terms</h2>
                            <p className="text-muted-foreground">
                                By accessing and using Affordable Abode's services, you accept and agree to be bound by the
                                terms and provision of this agreement.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">Use of Service</h2>
                            <p className="text-muted-foreground">
                                Our platform is provided for the purpose of connecting property seekers with luxury real estate
                                listings. You agree to use the service only for lawful purposes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">User Accounts</h2>
                            <p className="text-muted-foreground">
                                You are responsible for maintaining the confidentiality of your account and password.
                                You agree to accept responsibility for all activities that occur under your account.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">Property Listings</h2>
                            <p className="text-muted-foreground">
                                While we strive to ensure accuracy, property information is subject to change.
                                We recommend verifying all details before making any commitments.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">Limitation of Liability</h2>
                            <p className="text-muted-foreground">
                                Affordable Abode shall not be liable for any indirect, incidental, special, consequential,
                                or punitive damages resulting from your use of the service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">Contact</h2>
                            <p className="text-muted-foreground">
                                For questions about these Terms of Service, contact us at support@affordablehousing.com
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;
