import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import Hero from "./components/custom/Hero";
import CreateTrip from "./create-trip/index.jsx";
import Header from "./components/custom/Header";
import SignIn from "./components/custom/SignIn";
import ViewTrip from "./view-trip/[tripId]/index.jsx";
<<<<<<< HEAD
import Footer from './components/components/Footer';
import Trips from "./My-trips/trips";
=======
import { UserProvider } from './contexts/UserContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
>>>>>>> 2c1e06649c7c4fef724064074496bbcd3defbe55


function App() {
  return (
<<<<<<< HEAD
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
=======
    <GoogleOAuthProvider clientId="1053907879342-oj488bcv1pparovv1s7tcf0gbskpdpk1.apps.googleusercontent.com">
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}></GoogleOAuthProvider>
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
    </GoogleOAuthProvider>
>>>>>>> 2c1e06649c7c4fef724064074496bbcd3defbe55
  );
}


export default App;
