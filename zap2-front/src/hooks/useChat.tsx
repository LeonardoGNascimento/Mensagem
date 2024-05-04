import axios from "axios";
import { useCallback } from "react";

export function useChat() {
  const listar = useCallback(async () => {
    const { data } = await axios.get("http://localhost:3000/chat");
    return data;
  }, []);

  return { listar };
}
