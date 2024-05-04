import { io } from "socket.io-client";

const socket = io("http://192.168.0.17:3000/", {
  transportOptions: {
    polling: {
      extraHeaders: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywibm9tZSI6IkxlbzIiLCJpYXQiOjE3MTQ1OTM5OTEsImV4cCI6MTcxOTc3Nzk5MX0.l4FKHe9EZKVyltazZ_HNqjTzL0G710DZy_mnqgU9JB0",
      },
    },
  },
});

export default socket;
