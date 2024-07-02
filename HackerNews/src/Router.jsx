// Router.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer/Footer.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import New from "./Components/Navbar/New.jsx";
import Past from "./Components/Navbar/Past.jsx";
import FrontPage from "./pages/FrontPage";
import ResultPage from "./pages/ResultPage";
import PostAndComments from "./pages/PostAndComments";
import "./Router.css";
import User from "./pages/User";
import Comments from "./pages/Comments.jsx";
import LoginPage from "./pages/loginPage.jsx";

export default function Router() {
  return (
    <BrowserRouter className="flex flex-col min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/comments/:id" element={<PostAndComments />} />
        <Route path="/user" element={<User />} />
        <Route path="/results" element={<ResultPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/new" element={<New />} />
        <Route path="/past" element={<Past />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
