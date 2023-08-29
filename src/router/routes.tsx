import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";

export function RouterPage() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}