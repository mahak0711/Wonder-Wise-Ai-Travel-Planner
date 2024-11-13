import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import Hero from "./components/custom/Hero";
import CreateTrip from "./create-trip/index.jsx";
import Header from "./components/custom/Header";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen w-screen bg-gradient-to-t to-[#5C0FC2] via-[#3C008B] from-[#000000]">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/create-trip" element={<CreateTrip />} />{" "}
          {/* Add CreateTrip route */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
