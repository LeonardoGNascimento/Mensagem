import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import { useChat } from "../../../hooks/useChat";

interface Props {
  children: ReactNode;
}

interface IContext {
  chats: any[];
}

export const Context = createContext<IContext>({
  chats: [],
});

export function ListarContext({ children }: Props) {
  const [chats, setChats] = useState([]);
  const { listar: listarHook } = useChat();

  const listar = useCallback(async () => {
    const dados = await listarHook();

    setChats(dados);
  }, [listarHook]);

  useEffect(() => {
    listar();
  }, [listar]);

  return <Context.Provider value={{ chats }}>{children}</Context.Provider>;
}
