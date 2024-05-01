import { io } from "socket.io-client";

// Define a variable to hold the socket instance
let socket: any;

// Function to initialize the socket
export const initializeSocket = () => {
  // Check if we're running in a browser and if the socket has not been initialized yet
  if (typeof window !== "undefined" && !socket) {
    socket = io("http://localhost:3000");
  }

  return socket;
};
