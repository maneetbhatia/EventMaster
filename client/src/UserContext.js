import { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (  <UserContext.Provider  
        value={{
            isLoading,
            setIsLoading  
        }}>{children}
        </UserContext.Provider>
    );
};