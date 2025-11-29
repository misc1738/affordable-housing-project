// API Configuration
// Access environment variables safely

export const API_KEYS = {
    // IP Geolocation API - for location-based features
    ipGeolocation: import.meta.env.VITE_IPGEOLOCATION_API_KEY || '',

    // BigData Cloud API - for reverse geocoding and location data
    bigData: import.meta.env.VITE_BIGDATA_API_KEY || '',

    // Meteosource Weather API - for weather information
    meteosource: import.meta.env.VITE_METEOSOURCE_API_KEY || '',

    // PdfBolt API - for PDF generation
    pdfBolt: import.meta.env.VITE_PDFBOLT_API_KEY || '',
} as const;

// Helper function to check if API keys are configured
export const checkApiKeys = () => {
    const missing: string[] = [];

    if (!API_KEYS.ipGeolocation) missing.push('IPGEOLOCATION');
    if (!API_KEYS.bigData) missing.push('BIGDATA');
    if (!API_KEYS.meteosource) missing.push('METEOSOURCE');
    if (!API_KEYS.pdfBolt) missing.push('PDFBOLT');

    if (missing.length > 0) {
        console.warn(`Missing API keys: ${missing.join(', ')}`);
        console.warn('Please add them to your .env file');
    }

    return missing.length === 0;
};

// API Endpoints
export const API_ENDPOINTS = {
    ipGeolocation: 'https://api.ipgeolocation.io/ipgeo',
    bigData: 'https://api.bigdatacloud.net/data',
    meteosource: 'https://www.meteosource.com/api/v1/free',
    pdfBolt: 'https://api.pdfbolt.com/v1',
} as const;

export default API_KEYS;
