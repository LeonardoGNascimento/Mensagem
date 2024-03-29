import { useEffect, useState } from "react";
import { Container, Form, InputGroup, Navbar } from "react-bootstrap";
import socket from "../../config/socket";
import { Mensagem } from "./components/Mensagem";
import { DivMensagens } from "./components/styles";
import { ContainerChat } from "./style";

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

    socket.on("historico", (item) => {
      setMensagens(item);
    });

    socket.emit("criar_chat", {
      chat,
      usuario: localStorage.getItem("nome"),
    });

    socket.on("recebido", (teste) => {
      setMensagens((mensagensAnteriores) => [...mensagensAnteriores, teste]);
    });
  }, []);

  return (
    <ContainerChat>
      <Navbar
        bg="primary"
        data-bs-theme="dark"
        expand="lg"
        className="bg-body-tertiary"
      >
        <Container>
          <Navbar.Brand href="#home">ZAP ZAP 2</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
        </Container>
      </Navbar>
      {/* mensagens */}

      <DivMensagens>
        {mensagens.map((item: any, index: number) => {
          return (
            <Mensagem
              nome={item.usuario.nome}
              key={index}
              conteudo={item.mensagem}
              data={new Date(item.dataHora).toLocaleString()}
              usuarioLocal={true}
            />
          );
        })}
      </DivMensagens>

      {/* <a href="/">Voltar</a> */}
      <div>
        <Navbar
          bg="primary"
          data-bs-theme="dark"
          expand="lg"
          className="bg-body-tertiary"
        >
          <InputGroup>
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

                socket.emit("recebido", {
                  mensagem: mensagemAtual,
                  dataHora: new Date(),
                  chat,
                  usuario: localStorage.getItem("nome"),
                });
                setMensagemAtual("");
              }}
            />
          </InputGroup>
        </Navbar>
      </div>
    </ContainerChat>
  );
}
