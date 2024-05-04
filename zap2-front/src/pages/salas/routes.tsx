import { PrivateRoute } from "../../components/privateRoute";
import { Chat } from "../chat";
import { Listar } from "./listar";

export const salasRoutes = [
  {
    path: "/teste",
    element: (
      <PrivateRoute>
        <Listar />
      </PrivateRoute>
    ),
  },
  {
    path: "/chat",
    element: <Chat />,
  },
];
