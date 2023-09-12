import { Outlet } from "react-router-dom";
import Header from "../header/Header";

export default function LayOut() {
  return (
    <main className="main">
      <Header />
      <Outlet />
    </main>
  );
}
