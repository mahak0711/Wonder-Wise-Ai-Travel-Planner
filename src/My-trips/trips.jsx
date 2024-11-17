import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/services/fireBaseConfig";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";

function Trips() {
  const navigate = useNavigate();
  const[userTrips,setUserTrips]=useState([]);
  useEffect(() => {
    GetUserTrips();
  }, [])
  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }

    const q = query(
      collection(db, "AiTrips"), 
      where("userEmail", "==", user.email)
    );
    const querySnapshot = await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setUserTrips(prevVal=>[...prevVal,doc.data()]);
    });


  }
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">

<h2 className="text-3xl font-bold mb-5">My Trips</h2>

<div className="grid grid-cols-2 md:grid-cols-3 gap-5">
  {userTrips?.length>0?userTrips.map((trip,index)=>(
    <UserTripCardItem 
      key={index} 
      trip={trip} 
      className="object-cover rounded-xl"
    />
  )):
  [1,2,3,4,5,6].map((item,index)=>(
    <div key={index} className="h-[220px] w-full bg-slate-100 animate-pulse rounded-xl">
      
      </div>

  )

  )}
</div>
    </div>
  )
}

export default Trips;

