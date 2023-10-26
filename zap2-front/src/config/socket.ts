import { io } from "socket.io-client";

const socket = io("http://192.168.0.17:3000/", {
  transportOptions: {
    polling: {
      extraHeaders: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tZSI6IkxlbyIsImlhdCI6MTY5Nzg5NzY1MCwiZXhwIjoxNzAzMDgxNjUwfQ.Uo8Ec7pVKPgV7wu284faaBCy-UbgSl1gXBXCnSW74io",
      },
    },
  },
});

export default socket;
