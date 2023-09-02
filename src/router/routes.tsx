import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";
import { Feed } from "../pages/feed/feed";
import { CommentsPage } from "../pages/Comments/comments";

export function RouterPage() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Feed />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/post/:id/comments" element={<CommentsPage />} />
        <Route path="*" element={<Feed />} />
      </Routes>
    </BrowserRouter>
  );
}
