import React, { createContext } from "react";
import socket from "../utils/socket";

export const SocketContext = createContext();

const SocketProvider = ({children}) => {
    return (
        <SocketContext.Provider value={{socket}}>
           {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider