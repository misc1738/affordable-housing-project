import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getIpGeolocation } from "@/lib/api-services";

interface LocationData {
    ip: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    countryCode: string;
}

interface LocationContextType {
    location: LocationData | null;
    loading: boolean;
    error: boolean;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
    const [location, setLocation] = useState<LocationData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const detectLocation = async () => {
            try {
                const data = await getIpGeolocation();

                if (data) {
                    setLocation({
                        ip: data.ip,
                        city: data.city,
                        country: data.country_name,
                        latitude: parseFloat(data.latitude),
                        longitude: parseFloat(data.longitude),
                        countryCode: data.country_code2
                    });
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Location detection error:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        detectLocation();
    }, []);

    return (
        <LocationContext.Provider value={{ location, loading, error }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => {
    const context = useContext(LocationContext);
    if (context === undefined) {
        throw new Error("useLocation must be used within a LocationProvider");
    }
    return context;
};
