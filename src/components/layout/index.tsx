import { Outlet } from "react-router-dom";
import { Header } from "../header";
import { Container } from "../container";

export function Layout() {
  return (
    <div>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}
