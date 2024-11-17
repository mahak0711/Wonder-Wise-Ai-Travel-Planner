import { getPlaces, PHOTO_REF_URL } from "@/services/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HotelCardItem({ hotel, index }) {
    
    // Add a more specific guard clause
    if (!hotel || Object.keys(hotel).length === 0) {
        return (
            <div className="text-center p-5">
                <p>No hotel information available</p>
            </div>
        );
    }

    const [photoUrl, setPhotoUrl] = useState();

    // Fetch photo for the hotel when the component mounts or hotel changes
    useEffect(() => {
        if (hotel) {
            getPlacesPhotos();
        }
    }, [hotel]);

    const getPlacesPhotos = async () => {
        try {
            const data = {
                textQuery: hotel?.HotelName || '',
                languageCode: "en",
            };

            if (!data.textQuery) {
                return;
            }

            const result = await getPlaces(data);

            // Get the photo reference URL if available, otherwise use a default image
            const photoRefUrl = result.data?.places?.[0]?.photos?.[3]?.name
                ? PHOTO_REF_URL.replace("{NAME}", result.data.places[0].photos[3].name)
                : "/path/to/default/image.jpg";

            setPhotoUrl(photoRefUrl);
        } catch (error) {
            setPhotoUrl("/path/to/error/image.jpg"); // Handle errors with a fallback image
        }
    };

    return (
        <div>
            <Link
                key={`hotel-${index}-${hotel.HotelName}`}
                to={encodeURI(
                    `https://www.google.com/maps/search/?api=1&query=${hotel.HotelName},${hotel.HotelAddress}`
                )}
                target="_blank"
            >
                <div className="hover:scale-105 transition-all duration-300 bg-black p-5 rounded-xl mt-5 ">
                    <img
                        src={photoUrl || hotel.hotelImageUrl}
                        alt={hotel?.HotelName || "Default Hotel"}
                        className="rounded-lg"
                    />
                    <div className="text-white">
                        <h2 className="text-medium font-bold">{hotel?.HotelName || "Unknown Hotel"}</h2>
                        <p className="text-sm text-gray-400">📍{hotel?.HotelAddress || "No address available"}</p>
                        <p className="text-sm">💰{hotel?.Price|| "Price not available"}</p>
                        <p className="text-sm">⭐Rating: {hotel?.Rating || "No rating"}</p>
                        <p className="text-sm text-gray-600">{hotel?.Description || "No description provided"}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default HotelCardItem;
