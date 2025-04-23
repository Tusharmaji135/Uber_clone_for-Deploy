import { createContext, useState, useContext, useEffect } from 'react';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(() => {
        const stored = localStorage.getItem("captain");
        return stored ? JSON.parse(stored) : null;
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateCaptain = (captainData) => {
        setCaptain(captainData);
        localStorage.setItem("captain", JSON.stringify(captainData));
    };

    // optional: clear storage on logout
    const clearCaptain = () => {
        setCaptain(null);
        localStorage.removeItem("captain");
    };

    const value = {
        captain,
        setCaptain: updateCaptain, // overwrite with persistent setter
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain,
        clearCaptain
    };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;
