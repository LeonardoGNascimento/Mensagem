import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { useState } from "react";

export interface Props {
  conteudo: string;
  data: string;
  usuarioLocal: boolean;
  nome: string;
  imagem: boolean;
}

export function Mensagem({ conteudo, data, usuarioLocal, nome, imagem }: Props) {
  const [show, setShow] = useState(false);
  let ladoMensagem = "";

  if (usuarioLocal == true) ladoMensagem = "d-flex flex-row-reverse";
  else ladoMensagem = "d-flex flex-row";

  return (
    <>
      <div className={`m-5 flex mr-5 ${usuarioLocal ? "justify-end " : "justify-start"}`}>
        <Card className={`!text-white font-bold shadow-lg border-none ${usuarioLocal ? "bg-primary-main " : "bg-secondary-main"}`}>
          <CardHeader>
            <CardDescription>{nome}</CardDescription>
          </CardHeader>
          <CardContent className="!text-white font-bold w-52 break-words">
            <p className="!text-white font-bold">{conteudo}</p>
          </CardContent>
          <CardFooter>{data}</CardFooter>
        </Card>
      </div>
    </>
  );
}
