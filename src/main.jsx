<<<<<<< Updated upstream
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, BrowserRouter } from "react-router-dom";
import CreateTrip from "./create-trip/index.jsx";
import Header from "./components/custom/Header.jsx";
import { Toaster } from "sonner";
=======
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
>>>>>>> Stashed changes

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <App />
    <Toaster/>
  </React.StrictMode>
)
