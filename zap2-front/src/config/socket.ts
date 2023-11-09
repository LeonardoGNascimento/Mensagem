import { io } from "socket.io-client";

const socket = io("http://192.168.0.17:3000/", {
  transportOptions: {
    polling: {
      extraHeaders: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tZSI6ImxlbyIsImlhdCI6MTY5OTA5Njc0NSwiZXhwIjoxNzA0MjgwNzQ1fQ.R-fzusy3vVghZwjrDtCXHwRXgowr7FEkl5SPGq2KwKE",
      },
    },
  },
});

export default socket;
