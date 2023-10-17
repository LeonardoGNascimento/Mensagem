import { useEffect, useState } from "react";
import { Login } from "./pages/login";
import { Chat } from "./pages/chat";

export default function App() {
  const [chat, setChat] = useState<string | null>();

  useEffect(() => {
    const queryString = window.location.search;
    const searchParams = new URLSearchParams(queryString);
    const paramValue = searchParams.get("chat");

    setChat(paramValue);
  }, []);

  return chat ? <Chat chat={chat}/> : <Login />;
}
