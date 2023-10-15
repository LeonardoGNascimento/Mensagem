import { Col, Row, Button } from "react-bootstrap";
import { TextField } from "@mui/material";

export default function App() {
  return (
    <>
      <div className="d-flex justify-content-center">
        <Row>
          <Col>
            <TextField id="nome" label="Nome" variant="outlined" />
          </Col>
          <Col>
            <TextField
              id="outlined-basic"
              label="Código sala"
              variant="outlined"
            />
          </Col>
        </Row>
      </div>
      <div className="d-flex justify-content-center">
        <Button>Gerar Link</Button>
        <Button>Entrar</Button>
      </div>
    </>
  );
}
