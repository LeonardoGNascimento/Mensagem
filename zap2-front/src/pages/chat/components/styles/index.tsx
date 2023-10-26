import styled from "styled-components";

const DivMensagens = styled.div`
  color: white;
  align-items: center;
  background-image: url("/src/assets/background.jpg");
  z-index: 2;
  object-fit: cover;
  object-position: bottom;
  position: relative;
  background-repeat: no-repeat, no-repeat;
  max-height: 52.1rem;
  overflow-y: scroll;
  background-size: cover;
`;
const Mensagem = styled.div<{ $backgroundColor?: string }>`
  background-color: ${(props) => props.$backgroundColor};
  color: #b5e1ef;
  margin-bottom: 30px;
  border-radius: 10px;
  padding: 10px;
  width: 50%;
`;

export { DivMensagens, Mensagem };
