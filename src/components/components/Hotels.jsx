import React from "react";
import HotelCardItem from "./HotelCardItem";

function Hotels({ trip }) {
    // Check if trip data exists
    if (!trip || !trip.tripData) {
        return <div className="p-4">Loading trip data...</div>;
    }

    // Check if there are any hotel options available
    if (!trip.tripData.HotelOptions?.length) {
        return <div className="p-4">No hotel recommendations available</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mt-5">Hotel Recommendations</h2>
            <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {trip.tripData.HotelOptions.map((hotel, index) => (
                    <HotelCardItem key={index} hotel={hotel} index={index} />
                ))}
            </div>
        </div>
    );
}

export default Hotels;
