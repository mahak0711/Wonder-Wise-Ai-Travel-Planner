import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { IoIosSend } from "react-icons/io";
import { getPlaces, PHOTO_REF_URL } from "@/services/GlobalApi";



function Information({ trip }) {

const [photoUrl, setPhotoUrl] = useState();

useEffect(()=>{
getPlacesPhotos();
},[trip])
    const getPlacesPhotos = async () => {
        try {
            console.log("Trip data:", trip);
            console.log("Location:", trip?.userSelection?.location?.label);

            if (!trip?.userSelection?.location?.label) {
                console.log("No location provided - waiting for trip data to load");
                return;
            }
            
            const data = {
                textQuery: trip.userSelection.location.label,
                languageCode: "en"
            }
            
            console.log("Fetching photo for:", data.textQuery);
            
            const result = await getPlaces(data);
            
            if (!result.data?.places?.[0]?.photos?.[3]?.name) {
                console.log("No photos found in API response");
                return;
            }

            const photoRefUrl = PHOTO_REF_URL.replace("{NAME}", result.data.places[0].photos[3].name);
            setPhotoUrl(photoRefUrl);
        } catch (error) {
            console.error("Error fetching places:", error.response?.data || error.message);
        }
    }

    if (!trip) {
        return <div>Loading...</div>;
    }

    if (!trip.userSelection) {
        return <div>No trip information available</div>;
    }

    return (
        <div>
            <img src={photoUrl} className="h-[300px] w-full object-cover rounded-xl"  alt={trip.title} />
           <div className="flex justify-between items-center">
            <div className="my-5 flex flex-col gap-2">
                <h2 className="text-2xl font-bold">
                    {trip?.userSelection?.location?.label}
                </h2>
                <div className="flex gap-5">
                    <h2
                        className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md"
                        aria-label={`Trip duration: ${trip.userSelection?.numberOfDays} days`}
                    >
                        🗓️{trip.userSelection?.numberOfDays} Days
                    </h2>
                    <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md">
                    💸{trip.userSelection?.budget} Budget
                    </h2>
                    <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md">
                    🧳Number Of Travellers: {trip.userSelection?.travelers
                        }
                    </h2>   
                </div>
                </div>
                
                    <Button><IoIosSend /></Button>
               
               
            </div>
        </div>
    );
}

export default Information;