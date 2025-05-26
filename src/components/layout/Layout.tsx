import { Outlet } from "react-router-dom";
import { Container } from "../container/Container";
import { Header } from "../header/Header";

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
