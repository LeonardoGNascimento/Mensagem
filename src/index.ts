import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const historico: string[] = [];
const chats: any[] = [];
const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));

const serverHttp = http.createServer(app);

const io = new Server(serverHttp);

io.on("connection", (socket) => {
  socket.on("criar_chat", (chat, callback) => {
    socket.join(chat.chat);

    if (!chats.includes(chat.chat)) {
      chats.push({
        chat: chat.chat,
        mensagens: [],
      });
    }
    io.to(chat.chat).emit("alerta", `${chat.usuario} entrou no chat`);

    const mensagens = chats.find((item) => item.chat == chat.chat);

    callback(mensagens);
  });

  socket.on("recebido", (texto) => {
    const cha = chats.find((item) => item.chat == texto.chat);
    cha.mensagens.push(texto.mensagem);
    io.to(texto.chat).emit("recebido", texto.mensagem);
  });
});

serverHttp.listen(3000);
