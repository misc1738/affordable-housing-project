import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

const AdminSettings = () => {
    const [settings, setSettings] = useState({
        siteName: "Affordable Abode",
        contactEmail: "support@affordablehousing.com",
        contactPhone: "+254 702 005 992",
        address: "Westlands, Nairobi, Kenya",
        facebook: "https://facebook.com/affordableabode",
        twitter: "https://twitter.com/affordableabode",
        instagram: "https://instagram.com/affordableabode",
        linkedin: "https://linkedin.com/company/affordableabode"
    });

    const handleSave = () => {
        console.log("Saving settings:", settings);
        alert("Settings saved successfully!");
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
                    <p className="text-gray-600">Configure your site settings and preferences.</p>
                </div>
                <Button onClick={handleSave} className="gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                </Button>
            </div>

            {/* General Settings */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">General Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                        <input
                            type="text"
                            value={settings.siteName}
                            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                        <input
                            type="email"
                            value={settings.contactEmail}
                            onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                        <input
                            type="tel"
                            value={settings.contactPhone}
                            onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <input
                            type="text"
                            value={settings.address}
                            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Social Media Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                        <input
                            type="url"
                            value={settings.facebook}
                            onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                        <input
                            type="url"
                            value={settings.twitter}
                            onChange={(e) => setSettings({ ...settings, twitter: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                        <input
                            type="url"
                            value={settings.instagram}
                            onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                        <input
                            type="url"
                            value={settings.linkedin}
                            onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
