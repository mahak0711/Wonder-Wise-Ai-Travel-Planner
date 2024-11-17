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
import Footer from './components/components/Footer';
import Trips from "./My-trips/trips";


function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen pb-16">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/view-trip/:tripId" element={<ViewTrip />} />
          <Route path="/my-trips" element={<Trips />} />
          <Route path="/my-trips/:tripId" element={<Trips />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}


export default App;
