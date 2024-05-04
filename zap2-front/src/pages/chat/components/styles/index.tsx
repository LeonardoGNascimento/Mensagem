import styled from "styled-components";

const DivMensagens = styled.div`
  color: white;
  align-items: center;

  z-index: 2;
  object-fit: cover;
  object-position: bottom;
  position: relative;
  background-repeat: no-repeat, no-repeat;
  height: 52.1rem;
  max-height: 52.1rem;
  overflow-y: scroll;
  background-size: cover;
  padding: 0 15rem;
`;
const Mensagem = styled.div<{ $backgroundColor?: string }>`
  background-color: ${(props) => props.$backgroundColor};
  color: #b5e1ef;
  margin-bottom: 30px;
  border-radius: 10px;
  padding: 10px;
  width: auto;
`;

export { DivMensagens, Mensagem };
