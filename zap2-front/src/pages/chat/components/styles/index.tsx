import styled from "styled-components";

const DivMensagens = styled.div`
   color: white;
   align-items: center;
   background-image: 
       url("/src/assets/background.jpg");
       z-index: 2;
       height: 100%;
       width: 100%;
       object-fit: cover;
       object-position: bottom;
       position: relative;
   background-repeat: no-repeat, no-repeat;
   padding: 30px;
   height: 400px;
   max-height: 1000px;
   overflow-y: scroll;
   background-size: cover;
`
const Mensagem = styled.div<{ $backgroundColor?:string; }>`
   background-color: ${props => props.$backgroundColor};
   color: #B5E1EF;
   margin-bottom: 30px;
   border-radius: 10px;
   padding: 10px;
   width: 50%;
`

export {DivMensagens, Mensagem}