import { io } from "socket.io-client";

const socket = io(`${process.env.NEXT_PUBLIC_CHATBOT_URL}`);

export default socket;