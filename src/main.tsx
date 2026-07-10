import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import BridgePage from "./pages/BridgePage";
import MomentsPage from "./pages/MomentsPage";
import StoryPage from "./pages/StoryPage";
import ArticlesListPage from "./pages/ArticlesListPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import EventDetailPage from "./pages/EventDetailPage";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/bridge-ai" element={<BridgePage />} />
        <Route path="/moments" element={<MomentsPage />} />
        <Route path="/story/:id" element={<StoryPage />} />
        <Route path="/articles" element={<ArticlesListPage />} />
        <Route path="/article/:id" element={<ArticleDetailPage />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
