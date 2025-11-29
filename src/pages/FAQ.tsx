import Navbar from "@/components/Navbar";

const FAQ = () => {
    const faqs = [
        {
            question: "How do I apply for a property?",
            answer: "Visit our Properties page, select a property you're interested in, and click 'Apply Now'. Fill out the application form with your details."
        },
        {
            question: "What documents do I need?",
            answer: "You'll need a valid ID, proof of income, bank statements for the last 3 months, and employment verification letter."
        },
        {
            question: "How long does the application process take?",
            answer: "Typically 5-7 business days from submission to approval, depending on document verification."
        },
        {
            question: "Can I schedule a property viewing?",
            answer: "Yes! Each property listing has a 'Schedule Viewing' button. Our team will contact you to confirm the appointment."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept bank transfers, mobile money (M-Pesa), and certified checks."
        },
        {
            question: "Are the properties verified?",
            answer: "Yes, all our properties undergo thorough verification and are marked with a verification badge."
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto px-4 pt-24 pb-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
                    <p className="text-lg text-muted-foreground mb-8">
                        Find answers to common questions about our services and properties.
                    </p>

                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-card p-6 rounded-lg border">
                                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                                <p className="text-muted-foreground">{faq.answer}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 bg-primary/10 p-6 rounded-lg">
                        <h3 className="font-semibold mb-2">Still have questions?</h3>
                        <p className="text-muted-foreground">
                            Contact our support team at <a href="mailto:support@affordablehousing.com" className="text-primary hover:underline">support@affordablehousing.com</a> or call us at +254 702 005 992
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
