import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from "@react-oauth/google";



function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    console.log(user);

  }, [])

  return (
    <div className="p-2 flex justify-between items-center pt-3 mx-6">
      <img onClick={()=>navigate("/")} src="/logo.png" className="cursor-pointer w-[100p] h-[50px]"></img>
      <div className="w-1/3 flex flex-row justify-between text-white text-xl">
        {/* <p>Home</p>
        <p>About Us</p>
        <p>Services</p>
        <p>Contact</p> */}
      </div>
      <div className="flex flex-row justify-end gap-x-4">
        {user ?
          <div className="flex flex-row gap-x-4 items-center">

            <Button onClick={()=>navigate("/my-trips")} variant="outline" className="rounded-full">My Trips</Button>
            <Popover>
              <PopoverTrigger  className="rounded-full bg-white">          
                <img  src={user?.picture} className="w-[25px] h-[25px] rounded-full bg-white"></img>
              </PopoverTrigger>
              <PopoverContent>
                <h2 
                  className="cursor-pointer hover:bg-gray-100 p-2"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    navigate("/");
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>

          </div> : <Button className="px-8" onClick={() => navigate("/signin")}>
            Sign In
          </Button>
        }

        {/* <Button className="px-8">Wallet</Button> */}
      </div>
    </div>
  );
}

export default Header;