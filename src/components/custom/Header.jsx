import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="p-2 flex justify-between items-center pt-3 mx-6">
      <img src="logo.png" className="w-[100p] h-[50px]"></img>
      <div className="w-1/3 flex flex-row justify-between text-white text-xl">
        <p>Home</p>
        <p>About Us</p>
        <p>Services</p>
        <p>Contact</p>
      </div>
      <div className="flex flex-row justify-end gap-x-4">
        <Button className="px-8" onClick={() => navigate("/signin")}>
          Sign In
        </Button>
        <Button className="px-8">Wallet</Button>
      </div>
    </div>
  );
}

export default Header;
