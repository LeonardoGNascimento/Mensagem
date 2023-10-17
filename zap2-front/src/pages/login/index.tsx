import { Col, Row, Button } from "react-bootstrap";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export function Login() {
  const [codigo, setCodigo] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [nomeErro, setNomeErro] = useState(false);
  const [chatErro, setChatErro] = useState(false);

  useEffect(() => {
    const queryString = window.location.search;
    const searchParams = new URLSearchParams(queryString);
    const paramValue = searchParams.get("codigo");
    const nomeSalvo = localStorage.getItem("nome");

    if (nomeSalvo) {
      setNome(nomeSalvo);
    }

    if (paramValue) {
      setCodigo(paramValue);
    }
  }, []);

  function login() {
    if (!nome) {
      setNomeErro(true);
      return;
    }

    if (!codigo) {
      setChatErro(true);
      return;
    }

    localStorage.setItem("nome", nome);
    window.location.href = `?chat=${codigo}`;
  }

  function geraStringAleatoria(tamanho: number) {
    var stringAleatoria = "";
    var caracteres =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < tamanho; i++) {
      stringAleatoria += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length)
      );
    }
    setCodigo(stringAleatoria);
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <div className="d-flex justify-content-center mb-5 mt-5">
        <div>
          <Row className="mb-3">
            <Col>
              <TextField
                id="nome"
                label="Nome"
                variant="outlined"
                error={nomeErro}
                value={nome}
                onChange={(e) => {
                  setNome(e.target.value);
                  setNomeErro(false);
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <TextField
                id="outlined-basic"
                label="Código sala"
                variant="outlined"
                error={chatErro}
                value={codigo}
                onChange={(e) => {
                  setCodigo(e.target.value);
                  setChatErro(false);
                }}
              />
            </Col>
          </Row>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <Button className="me-1" onClick={() => geraStringAleatoria(20)}>
          Gerar Link
        </Button>
        <Button onClick={login}>Entrar</Button>
      </div>
    </>
  );
}
