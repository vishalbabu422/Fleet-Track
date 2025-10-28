import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import "toastr/build/toastr.min.css";
import toastr from "toastr";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    toastr.options = {
      positionClass: "toast-top-right",
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}


export default App;
