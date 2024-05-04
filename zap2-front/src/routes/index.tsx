import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "../pages/login";
import { salasRoutes } from "../pages/salas/routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  ...salasRoutes,
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
