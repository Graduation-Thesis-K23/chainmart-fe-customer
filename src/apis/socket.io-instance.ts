import { Manager, io } from "socket.io-client";

const manager = new Manager(process.env.NEXT_PUBLIC_NOTIFICATION_URL ?? "", {
  reconnectionDelayMax: 10000,
  withCredentials: true,
});

export const chatbotSocket = io(process.env.NEXT_PUBLIC_CHATBOT_URL ?? "");
export const ordersSocket = manager.socket("/orders");
