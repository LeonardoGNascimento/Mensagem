import { useEffect, useState } from "react";
import socket from "../../config/socket";
import { Mensagem } from "./components/Mensagem";
import { DivMensagens } from "./components/styles";
import { ContainerChat } from "./style";
import { parseJwt } from "../../core/token";
import { useSearchParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Chat() {
  const [searchParams] = useSearchParams();

  const [mensagemAtual, setMensagemAtual] = useState<any>("");
  const [mensagens, setMensagens] = useState<any[]>([]);
  const [mensagemArquivo, setMensagemArquivo] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("nome")) {
      window.location.href = `/?codigo=${searchParams.get("chat")}`;
      return;
    }

    socket.emit("criar_chat", {
      chat: searchParams.get("chat"),
      usuario: localStorage.getItem("nome"),
    });

    socket.on("historico", (item) => {
      setMensagens(item);
    });

    socket.on("recebido", (teste) => {
      if (teste.arquivo) {
        const blob = new Blob([teste.mensagem]);
        const url = URL.createObjectURL(blob);
        teste.mensagem = url;
      }

      setMensagens((mensagensAnteriores) => [...mensagensAnteriores, teste]);
    });
  }, [searchParams.get("chat")]);

  return (
    <div className="h-screen flex flex-col">
      <ScrollArea className="pt-5 flex-grow overflow-y-auto">
        {mensagens.map((item: any, index: number) => (
          <Mensagem
            nome={item.usuario.nome}
            key={index}
            conteudo={item.mensagem}
            data={new Date(item.dataHora).toLocaleString()}
            usuarioLocal={parseJwt().id === item.usuario.id}
            imagem={item.arquivo}
          />
        ))}
      </ScrollArea>
      <div className="p-2 flex gap-4">
        <Input className="shadow-lg" value={mensagemAtual} onChange={(item) => setMensagemAtual(item.target.value)} />
        <Button
          onClick={() => {
            socket.emit("enviar", {
              mensagem: mensagemAtual,
              dataHora: new Date(),
              chat: searchParams.get("chat"),
              usuario: localStorage.getItem("nome"),
              arquivo: mensagemArquivo,
            });
          }}
        >
          Enviar
        </Button>
        {/* {mensagemArquivo ? (
          <input
            className="form-control"
            type="file"
            placeholder="Digite uma Mensagem"
            onChange={(item) => setMensagemAtual(item.target.files)}
          />
        ) : (
          <Form.Control
            as="textarea"
            aria-label="With textarea"
            placeholder="Digite uma Mensagem"
            value={mensagemAtual}
            onChange={(item) => setMensagemAtual(item.target.value)}
            onKeyDown={(event) => {
              if (event.key !== "Enter" && event.keyCode !== 13) {
                return;
              }

              socket.emit("enviar", {
                mensagem: mensagemAtual,
                dataHora: new Date(),
                chat: searchParams.get("chat"),
                usuario: localStorage.getItem("nome"),
              });
              setMensagemAtual("");
            }}
          />
        )} */}
        {/* <button
          onClick={() => {
            setMensagemArquivo(!mensagemArquivo);
          }}
        >
          arquivo
        </button>

        <button
          onClick={() => {
            socket.emit("enviar", {
              mensagem: mensagemAtual,
              dataHora: new Date(),
              chat: searchParams.get("chat"),
              usuario: localStorage.getItem("nome"),
              arquivo: mensagemArquivo,
            });
          }}
        >
          Enviar
        </button> */}
      </div>
    </div>
  );
}
