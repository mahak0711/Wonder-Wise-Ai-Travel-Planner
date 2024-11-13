import React from "react";

function Hotels({trip}){
    return(
        <>
        <h2 className="text-2xl font-bold">Hotels</h2>
        <div className="grid grid-cols-2">
            {trip?.tripData?.hotels?.maps((item,index)=>(
<div>
    <img src={item.image} alt={item.name} />
    <h2 className="text-2xl font-bold">{item.name}</h2>
</div>
            ))}
        </div>
        </>
    )
}
export default Hotels;
