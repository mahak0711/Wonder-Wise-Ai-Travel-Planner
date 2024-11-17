import { getPlaces, PHOTO_REF_URL } from "@/services/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserTripCardItem({trip}){

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

    
  return(
    <Link to={'/view-trip/'+trip?.id}>
    <div >
    <img src={photoUrl} className="hover:scale-105 transition-all duration-300 object-cover h-[220px] w-full gap-10 rounded-xl mt-5"/>
  <div>
    <h2 className="text-2xl mt-4 ">
        {trip?.userSelection?.location?.label}
    </h2>
    <h2 className="text-sm text-gray-500">
        {trip?.userSelection?.numberOfDays} Days trip with {trip?.userSelection?.budget} Budget
    </h2>
</div>
  
  </div>
  </Link>
  )
}

export default UserTripCardItem;
