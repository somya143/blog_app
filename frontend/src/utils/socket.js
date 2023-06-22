import { io } from "socket.io-client";

const socket = io(process.env.REACT_BASE_API , {autoConnect:false});

export default socket;