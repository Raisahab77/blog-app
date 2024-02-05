import {createContext, useState} from "react";

export const userContext = createContext({});

export function UserContextProvider({children}){
    const [isAuthenticated,setIsAuthenticated] = useState(false);

    return (
        <userContext.Provider value={{isAuthenticated,setIsAuthenticated}}>
            {children}
        </userContext.Provider>
    )
}