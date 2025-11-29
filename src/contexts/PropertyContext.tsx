import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LuxuryProperty, PropertyWithStatus } from '@/data/properties';
import { PROPERTIES as INITIAL_PROPERTIES } from '@/data/properties';

interface PropertyContextType {
    properties: PropertyWithStatus[];
    addProperty: (property: Omit<PropertyWithStatus, 'id' | 'createdAt'>) => void;
    updateProperty: (id: number, updates: Partial<PropertyWithStatus>) => void;
    deleteProperty: (id: number) => void;
    getProperty: (id: number) => PropertyWithStatus | undefined;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const useProperties = () => {
    const context = useContext(PropertyContext);
    if (!context) {
        throw new Error('useProperties must be used within a PropertyProvider');
    }
    return context;
};

interface PropertyProviderProps {
    children: ReactNode;
}

export const PropertyProvider: React.FC<PropertyProviderProps> = ({ children }) => {
    const [properties, setProperties] = useState<PropertyWithStatus[]>([]);

    // Load properties from localStorage or use initial data
    useEffect(() => {
        const savedProperties = localStorage.getItem('affordable_abode_properties');
        if (savedProperties) {
            try {
                const parsed = JSON.parse(savedProperties);
                // Merge with initial properties if needed, or just use saved
                // For this implementation, we'll assume saved properties are the source of truth
                // if they exist, but we might want to ensure initial ones are always there.
                // Let's simple use saved if exists, else initial.
                setProperties(parsed);
            } catch (e) {
                console.error("Failed to parse properties from local storage", e);
                setProperties(INITIAL_PROPERTIES);
            }
        } else {
            setProperties(INITIAL_PROPERTIES);
        }
    }, []);

    // Save to localStorage whenever properties change
    useEffect(() => {
        if (properties.length > 0) {
            localStorage.setItem('affordable_abode_properties', JSON.stringify(properties));
        }
    }, [properties]);

    const addProperty = (newPropertyData: Omit<PropertyWithStatus, 'id' | 'createdAt'>) => {
        const newProperty: PropertyWithStatus = {
            ...newPropertyData,
            id: Date.now(), // Simple ID generation
            createdAt: new Date().toISOString()
        };
        setProperties(prev => [newProperty, ...prev]);
    };

    const updateProperty = (id: number, updates: Partial<PropertyWithStatus>) => {
        setProperties(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    };

    const deleteProperty = (id: number) => {
        setProperties(prev => prev.filter(p => p.id !== id));
    };

    const getProperty = (id: number) => {
        return properties.find(p => p.id === id);
    };

    return (
        <PropertyContext.Provider value={{ properties, addProperty, updateProperty, deleteProperty, getProperty }}>
            {children}
        </PropertyContext.Provider>
    );
};
