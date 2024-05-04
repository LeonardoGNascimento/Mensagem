import { Chat } from "../../chat";
import { Lista } from "./container/listagem";
import { ListarContext } from "./contexts";

export function Listar() {
  return (
    <ListarContext>
      <div className="flex h-full">
        <div className="w-0 lg:w-96 shadow-lg">
          <Lista />
        </div>
        <div className="w-full">
          <Chat />
        </div>
      </div>
    </ListarContext>
  );
}
