import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Layout } from "./pages/Layout";
import { ViewList } from "./components/ViewList/ViewList";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/viewList" element={<ViewList />} />
        </Route>
      </Routes>
    </Router>
  );
};
