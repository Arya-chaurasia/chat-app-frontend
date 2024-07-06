import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { useSelector } from 'react-redux';

const SocketContext = createContext();
const ENDPOINT = 'http://localhost:5001';
console.log(ENDPOINT, "endpoint")
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const userId = useSelector((state) => state.auth.user?.userId);

    console.log(userId, "userId from context")

    useEffect(() => {
        if (userId) {
            console.log(`Connecting socket for user ID: ${userId}`);
            const newSocket = socketIOClient(ENDPOINT);
            newSocket.emit('register', userId);
            setSocket(newSocket);

            return () => {
                console.log(`Disconnecting socket for user ID: ${userId}`);
                newSocket.disconnect();
            };
        }
    }, [userId]);
    console.log('Socket state:', socket);
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

