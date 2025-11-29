import Navbar from "@/components/Navbar";

const Cookies = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto px-4 pt-24 pb-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>
                    <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

                    <div className="prose prose-lg max-w-none space-y-6">
                        <section>
                            <h2 className="text-2xl font-semibold mb-3">What Are Cookies</h2>
                            <p className="text-muted-foreground">
                                Cookies are small text files that are placed on your device when you visit our website.
                                They help us provide you with a better experience by remembering your preferences.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">How We Use Cookies</h2>
                            <p className="text-muted-foreground">We use cookies to:</p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-2">
                                <li>Remember your login information</li>
                                <li>Understand how you use our website</li>
                                <li>Improve our services</li>
                                <li>Personalize your experience</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">Types of Cookies We Use</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold mb-1">Essential Cookies</h3>
                                    <p className="text-muted-foreground">Required for the website to function properly.</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Analytics Cookies</h3>
                                    <p className="text-muted-foreground">Help us understand how visitors interact with our website.</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Preference Cookies</h3>
                                    <p className="text-muted-foreground">Remember your settings and preferences.</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">Managing Cookies</h2>
                            <p className="text-muted-foreground">
                                You can control and/or delete cookies as you wish through your browser settings.
                                However, disabling cookies may affect the functionality of our website.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
                            <p className="text-muted-foreground">
                                If you have questions about our use of cookies, please contact us at support@affordablehousing.com
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cookies;
