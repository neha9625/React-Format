import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Layout = () => {
  return (
    <div>
      <header></header>
      <main className="h-full min-h-screen">
        <Outlet />
        <ToastContainer />
      </main>
      <footer className="mb-0"></footer>
    </div>
  );
};
