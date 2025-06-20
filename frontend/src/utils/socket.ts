// utils/socket.ts
import { io } from "socket.io-client";
import { BACKEND_URL } from "../service/backendURL";

export const socket = io(BACKEND_URL); 
