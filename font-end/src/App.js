import "./App.css";
import { Route, Routes } from "react-router-dom";
import LayOut from "./components/layout/LayOut";
import Home from "./Page/home/Home";
import Login from "./Page/login/Login";
import AboutUs from "./Page/aboutus/AboutUs";
import RequireAuth from "./Page/protech/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayOut />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path="aboutus" element={<AboutUs />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
