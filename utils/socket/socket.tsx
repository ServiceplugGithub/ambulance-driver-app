import AsyncStorage from "@react-native-async-storage/async-storage";
import { io } from "socket.io-client";

export const createSocket = async () => {
  // const deviceId = await getDeviceId();
  const deviceId = await AsyncStorage.getItem("deviceId");

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
