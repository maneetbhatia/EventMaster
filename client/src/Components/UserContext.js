import { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLogedIn , setIsLogedIn] = useState(null);
    const [isUserLoginIn, setIsUserLoginIn] = useState(false)
    const [name, setName] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false)


    return (  <UserContext.Provider  
        value={{
            isLoading,
            setIsLoading,
            isModalOpen, 
            setIsModalOpen,
            name,
            setName,
            isLogedIn,
            setIsLogedIn,
            isRegistrationModalOpen, 
            setIsRegistrationModalOpen,
            isUserLoginIn, 
            setIsUserLoginIn,
        }}>{children}
        </UserContext.Provider>
    );
};