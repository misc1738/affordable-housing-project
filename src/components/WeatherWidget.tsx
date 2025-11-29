import { useEffect, useState } from "react";
import { getWeatherForecast } from "@/lib/api-services";
import { Cloud, CloudRain, Sun, Wind, Droplets } from "lucide-react";

interface WeatherData {
    temperature: number;
    weather: string;
    windSpeed: number;
    humidity: number;
}

interface WeatherWidgetProps {
    location: string;
    className?: string;
}

const WeatherWidget = ({ location, className = "" }: WeatherWidgetProps) => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setLoading(true);
                setError(false);

                // Convert location to place_id format (simplified)
                const placeId = location.toLowerCase().split(',')[0].trim();
                const data = await getWeatherForecast(placeId);

                if (data && data.current) {
                    setWeather({
                        temperature: data.current.temperature,
                        weather: data.current.summary || data.current.weather,
                        windSpeed: data.current.wind?.speed || 0,
                        humidity: data.current.humidity || 0,
                    });
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Weather fetch error:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (location) {
            fetchWeather();
        }
    }, [location]);

    const getWeatherIcon = (weatherType: string) => {
        const type = weatherType?.toLowerCase() || '';
        if (type.includes('rain')) return <CloudRain className="w-8 h-8 text-blue-500" />;
        if (type.includes('cloud')) return <Cloud className="w-8 h-8 text-gray-500" />;
        return <Sun className="w-8 h-8 text-yellow-500" />;
    };

    if (loading) {
        return (
            <div className={`bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 ${className}`}>
                <div className="animate-pulse">
                    <div className="h-4 bg-blue-200 rounded w-24 mb-4"></div>
                    <div className="h-12 bg-blue-200 rounded w-32"></div>
                </div>
            </div>
        );
    }

    if (error || !weather) {
        return (
            <div className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 ${className}`}>
                <p className="text-sm text-gray-500">Weather data unavailable</p>
            </div>
        );
    }

    return (
        <div className={`bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 ${className}`}>
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-sm text-gray-600 mb-1">Current Weather</p>
                    <h3 className="text-3xl font-bold text-gray-900">{Math.round(weather.temperature)}°C</h3>
                    <p className="text-sm text-gray-700 capitalize mt-1">{weather.weather}</p>
                </div>
                {getWeatherIcon(weather.weather)}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-blue-200">
                <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4 text-gray-600" />
                    <div>
                        <p className="text-xs text-gray-600">Wind</p>
                        <p className="text-sm font-semibold text-gray-900">{weather.windSpeed} km/h</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-gray-600" />
                    <div>
                        <p className="text-xs text-gray-600">Humidity</p>
                        <p className="text-sm font-semibold text-gray-900">{weather.humidity}%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherWidget;
