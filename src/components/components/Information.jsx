import React from "react";

function Information({trip}){
    return(
        <>
        <div>
<img src={trip.image} alt={trip.title} />
<div className="my-5 flex flex-col gap-2">
    <h2 className="text-2xl font-bold">{trip?.userSelection?.location?.label}</h2>
<div className="flex gap-5">
    <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm" >{trip.userSelection?.numberOfDays}Day</h2>
    <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm" >{trip.userSelection?.budget}Budget</h2>
    <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm" >Number Of Traveller:{trip.userSelection?.traveler}</h2>

</div>
</div>
        </div>

        </>
    )
}
export default Information;