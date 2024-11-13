import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "sonner";

const rootElement = document.getElementById('root');

// Use createRoot to initialize and render the app
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>
);
