import React from "react";
import { Container } from "react-bootstrap";

interface Props {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: Props) {
  return <div className="h-screen">{children}</div>;
}
