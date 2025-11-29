import { API_KEYS, API_ENDPOINTS } from '@/config/api';

/**
 * IP Geolocation Service
 * Get location data based on IP address
 */
export const getIpGeolocation = async () => {
    try {
        const response = await fetch(
            `${API_ENDPOINTS.ipGeolocation}?apiKey=${API_KEYS.ipGeolocation}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch geolocation data');
        }

        return await response.json();
    } catch (error) {
        console.error('IP Geolocation error:', error);
        return null;
    }
};

/**
 * BigData Cloud Service
 * Reverse geocoding and location intelligence
 */
export const reverseGeocode = async (latitude: number, longitude: number) => {
    try {
        const response = await fetch(
            `${API_ENDPOINTS.bigData}/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=${API_KEYS.bigData}`
        );

        if (!response.ok) {
            throw new Error('Failed to reverse geocode');
        }

        return await response.json();
    } catch (error) {
        console.error('BigData Cloud error:', error);
        return null;
    }
};

/**
 * Meteosource Weather Service
 * Get weather forecast for a location
 */
export const getWeatherForecast = async (place_id: string) => {
    try {
        const response = await fetch(
            `${API_ENDPOINTS.meteosource}/point?place_id=${place_id}&sections=current&key=${API_KEYS.meteosource}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        return await response.json();
    } catch (error) {
        console.error('Meteosource error:', error);
        return null;
    }
};

/**
 * PdfBolt Service
 * Generate PDF documents
 */
export const generatePdf = async (htmlContent: string, options = {}) => {
    try {
        const response = await fetch(`${API_ENDPOINTS.pdfBolt}/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEYS.pdfBolt}`,
            },
            body: JSON.stringify({
                html: htmlContent,
                ...options,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to generate PDF');
        }

        return await response.blob();
    } catch (error) {
        console.error('PdfBolt error:', error);
        return null;
    }
};

// Export all services
export const apiServices = {
    getIpGeolocation,
    reverseGeocode,
    getWeatherForecast,
    generatePdf,
};
