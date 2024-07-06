import { io } from "socket.io-client";

const API_ENDPOINT = `${process.env.REACT_APP_BASEURL}`;

export const socketService = {
    connect,
};

function connect() {
    return new Promise((resolve, reject) => {
        const socket = io(API_ENDPOINT);
        socket.on("connect", () => {
            resolve(socket);
        });
    });
}


