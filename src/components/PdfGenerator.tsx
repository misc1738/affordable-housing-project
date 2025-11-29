import { Button } from "@/components/ui/button";
import { generatePdf } from "@/lib/api-services";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { LuxuryProperty } from "./LuxuryPropertyCard";

interface PdfGeneratorProps {
    property: LuxuryProperty;
    buttonText?: string;
    buttonVariant?: "default" | "outline" | "ghost";
    buttonSize?: "default" | "sm" | "lg";
}

const PdfGenerator = ({
    property,
    buttonText = "Download Brochure",
    buttonVariant = "outline",
    buttonSize = "default"
}: PdfGeneratorProps) => {
    const [generating, setGenerating] = useState(false);

    const handleGeneratePdf = async () => {
        try {
            setGenerating(true);

            // Create HTML content for the PDF
            const htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            padding: 40px;
                            color: #333;
                        }
                        .header {
                            text-align: center;
                            margin-bottom: 40px;
                            border-bottom: 3px solid #D4AF37;
                            padding-bottom: 20px;
                        }
                        .logo {
                            font-size: 32px;
                            font-weight: bold;
                            color: #D4AF37;
                            margin-bottom: 10px;
                        }
                        .property-image {
                            width: 100%;
                            max-height: 400px;
                            object-fit: cover;
                            border-radius: 10px;
                            margin-bottom: 30px;
                        }
                        .property-title {
                            font-size: 36px;
                            font-weight: bold;
                            margin-bottom: 10px;
                            color: #1a1a1a;
                        }
                        .property-location {
                            font-size: 18px;
                            color: #666;
                            margin-bottom: 20px;
                        }
                        .property-price {
                            font-size: 28px;
                            font-weight: bold;
                            color: #D4AF37;
                            margin-bottom: 30px;
                        }
                        .details-grid {
                            display: grid;
                            grid-template-columns: repeat(3, 1fr);
                            gap: 20px;
                            margin-bottom: 30px;
                        }
                        .detail-item {
                            text-align: center;
                            padding: 15px;
                            background: #f5f5f5;
                            border-radius: 8px;
                        }
                        .detail-label {
                            font-size: 12px;
                            color: #666;
                            text-transform: uppercase;
                            margin-bottom: 5px;
                        }
                        .detail-value {
                            font-size: 24px;
                            font-weight: bold;
                            color: #1a1a1a;
                        }
                        .footer {
                            margin-top: 50px;
                            padding-top: 20px;
                            border-top: 2px solid #eee;
                            text-align: center;
                            color: #666;
                        }
                        .contact-info {
                            margin-top: 20px;
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <div class="logo">Affordable Abode</div>
                        <p>Luxury Property Brochure</p>
                    </div>

                    <img src="${property.image}" alt="${property.title}" class="property-image" />

                    <h1 class="property-title">${property.title}</h1>
                    <p class="property-location">📍 ${property.location}</p>
                    <p class="property-price">
                        ${typeof property.price === 'number'
                    ? `KES ${(property.price / 1000000).toFixed(1)}M`
                    : property.price}
                    </p>

                    <div class="details-grid">
                        <div class="detail-item">
                            <div class="detail-label">Bedrooms</div>
                            <div class="detail-value">${property.beds}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Bathrooms</div>
                            <div class="detail-value">${property.baths}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Square Feet</div>
                            <div class="detail-value">${property.sqft}</div>
                        </div>
                    </div>

                    ${property.type ? `<p><strong>Property Type:</strong> ${property.type}</p>` : ''}

                    <div class="footer">
                        <div class="contact-info">
                            <p><strong>Contact Us</strong></p>
                            <p>📞 +254 702 005 992</p>
                            <p>📧 support@affordablehousing.com</p>
                            <p>📍 Westlands, Nairobi, Kenya</p>
                        </div>
                        <p style="margin-top: 20px; font-size: 12px;">
                            © ${new Date().getFullYear()} Affordable Abode. All rights reserved.
                        </p>
                    </div>
                </body>
                </html>
            `;

            const pdfBlob = await generatePdf(htmlContent, {
                format: 'A4',
                margin: { top: 0, right: 0, bottom: 0, left: 0 }
            });

            if (pdfBlob) {
                // Create download link
                const url = URL.createObjectURL(pdfBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${property.title.replace(/\s+/g, '-')}-Brochure.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            } else {
                alert('Failed to generate PDF. Please try again.');
            }
        } catch (error) {
            console.error('PDF generation error:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setGenerating(false);
        }
    };

    return (
        <Button
            variant={buttonVariant}
            size={buttonSize}
            onClick={handleGeneratePdf}
            disabled={generating}
            className="gap-2"
        >
            {generating ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                </>
            ) : (
                <>
                    <Download className="w-4 h-4" />
                    {buttonText}
                </>
            )}
        </Button>
    );
};

export default PdfGenerator;
