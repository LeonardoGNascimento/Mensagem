import { useEffect, useState } from "react";
import socket from "../../config/socket";
import { Button } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  chat: string;
}

export function Chat({ chat }: Props) {
  const [mensagemAtual, setMensagemAtual] = useState("");
  const [mensagens, setMensagens] = useState<any[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("nome")) {
      window.location.href = `/?codigo=${chat}`;
      return;
    }

    socket.emit(
      "criar_chat",
      {
        chat,
        usuario: localStorage.getItem("nome"),
      },
      (response: any) => {
        if (response) {
          setMensagens((mensagensAnteriores) => [
            ...mensagensAnteriores,
            ...response.mensagens,
          ]);
        }
      }
    );

    socket.on("recebido", (teste) => {
      setMensagens((mensagensAnteriores) => [...mensagensAnteriores, teste]);
    });
  }, []);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} gutter={8} />
      <div className="d-flex justify-content-center mb-5 mt-5">
        <div>
          <div>
            {mensagens.map((item: any, index: number) => {
              return (
                <p key={index}>
                  {item.usuario} : {item.mensagem} - {item.time}
                </p>
              );
            })}
          </div>
          <div>
            <textarea
              value={mensagemAtual}
              onChange={(item) => setMensagemAtual(item.target.value)}
              onKeyDown={(event) => {
                if (event.key !== "Enter" && event.keyCode !== 13) {
                  return;
                }

                socket.emit("recebido", {
                  mensagem: mensagemAtual,
                  time: new Date().toLocaleString(),
                  chat,
                  usuario: localStorage.getItem("nome"),
                });
                setMensagemAtual("");
              }}
            />
          </div>
          <a href="/">Voltar</a>
        </div>
      </div>
    </>
  );
}
