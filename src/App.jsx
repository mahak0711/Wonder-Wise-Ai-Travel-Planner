import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import Hero from "./components/custom/Hero";
import CreateTrip from "./create-trip/index.jsx";
import Header from "./components/custom/Header";
import SignIn from "./components/custom/SignIn";
import React from "react";
import ViewTrip from "./view-trip/[tripId]/index.jsx";
import { UserProvider } from './contexts/UserContext';


function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen w-screen bg-gradient-to-t to-[#5C0FC2] via-[#3C008B] from-[#000000]">
      <UserProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/create-trip" element={<CreateTrip />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/view-trip/:tripId" element={<ViewTrip />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}


export default App;
