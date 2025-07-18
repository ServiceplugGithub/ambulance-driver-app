import { io } from "socket.io-client";

export const createSocket = async () => {
  // const deviceId = await getDeviceId();
  const deviceId = "0dcb853c0283c629";

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
