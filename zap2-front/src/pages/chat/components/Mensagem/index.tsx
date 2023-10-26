import { Mensagem as MensagemStyle } from "../styles";

export interface Props {
  conteudo: string;
  data: string;
  usuarioLocal: boolean;
  nome: string;
}

export function Mensagem({ conteudo, data, usuarioLocal, nome }: Props) {
  var ladoMensagem = "";

  if (usuarioLocal == true) ladoMensagem = "d-flex flex-row-reverse";
  else ladoMensagem = "d-flex flex-row";

  return (
    <>
      <div className={ladoMensagem}>
        <MensagemStyle $backgroundColor={usuarioLocal ? "#005C4B" : "#202C33"}>
          <h6>{nome}</h6>
          <div style={{ width: "100%" }}>
            <p>{conteudo}</p>
          </div>
          <div>{data}</div>
        </MensagemStyle>
      </div>
    </>
  );
}
