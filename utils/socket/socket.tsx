import { io } from "socket.io-client";
import { getDeviceId } from "../config";

export const createSocket = async () => {
  const deviceId = await getDeviceId();

  const socket = io("https://emsplug.com", {
    autoConnect: true,
    transports: ["websocket"],
    query: {
      role: "ambulance",
      deviceId: deviceId,
    },
  });

  return socket;
};
