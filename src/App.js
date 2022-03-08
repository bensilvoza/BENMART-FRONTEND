import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import AdministratorHome from "./pages/administrator/home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/administrator" element={<AdministratorHome />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
