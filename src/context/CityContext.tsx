import { createContext, useContext, useState } from "react";

type CityContextType = {
    city: string;
    setCity: (newCity: string) => void
}
const CityContext = createContext<CityContextType | undefined>(undefined);

export function CityProvider({ children }: any) {
    const [city, setCity ] = useState("");

    return (
        <CityContext.Provider value={{ city, setCity}}>
            {children}
        </CityContext.Provider>
    )
}

export const useCity = () => {
    const context = useContext(CityContext);
    if (!context) {
        throw new Error("UseCity must be used inside a CityProvider")
    }
    return context;
}