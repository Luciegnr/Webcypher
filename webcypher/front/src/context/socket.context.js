import React from 'react';
import socketio from "socket.io-client";

const URL = process.env.REACT_APP_API_URL
export const socket = socketio.connect(`${URL}`);
export const SocketContext = React.createContext();