import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import cors from "cors"

const historico: string[] = [];
const chats: any[] = [];
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Substitua pela URL do seu aplicativo React
}));
app.use(express.static(path.join(__dirname, "..", "public")));

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  socket.on("criar_chat", (chat, callback) => {
    socket.join(chat.chat);
    
    io.to(chat.chat).emit('alerta', `${chat.usuario} entrou no chat`)
    const chatExiste = chats.find(item => item.chat === chat.chat)  

    if (!chatExiste) {
      chats.push({
        chat: chat.chat,
        mensagens: [],
      });
    }
    io.to(chat.chat).emit("alerta", `${chat.usuario} entrou no chat`);

    callback(chatExiste)
  });

  socket.on("recebido", (texto) => {
    const cha = chats.find((item) => item.chat == texto.chat);
    cha.mensagens.push(texto);
    io.to(texto.chat).emit("recebido", texto);
  });
});

serverHttp.listen(3000, () => console.log('asdsa'));
