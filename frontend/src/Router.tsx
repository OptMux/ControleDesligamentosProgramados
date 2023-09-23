import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/login/Login";
import { HomePage } from "./pages/home/Home";

export const Router = function () {
  return (
    <BrowserRouter basename="/cdp">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};
