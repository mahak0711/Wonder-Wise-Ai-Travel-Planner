import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";

const rootElement = document.getElementById('root');

// Use createRoot to initialize and render the app
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="859354826913-5gkf0m4t9baogncvkndaous91q7hj9sl.apps.googleusercontent.com">
    <App />
    <Toaster />
  </GoogleOAuthProvider>
  </React.StrictMode>

);
