import React, { useEffect, useState } from "react";
import CurrencyConverter from "./CurrencyConverter";
import { FaMapMarkedAlt } from "react-icons/fa";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { getPlaces, PHOTO_REF_URL } from "@/services/GlobalApi";

function PlacesToVisit({ trip, location }) {

    const [photoUrls, setPhotoUrls] = useState({});

    const getPlacePhoto = async (placeName) => {
        try {
            const data = {
                textQuery: placeName || '',
                languageCode: "en"
            }
            
            if (!data.textQuery) {
                console.log("No location provided");
                return null;
            }
            
            const result = await getPlaces(data);
            if (result.data.places[0]?.photos?.[0]?.name) {
                return PHOTO_REF_URL.replace("{NAME}", result.data.places[0].photos[0].name);
            }
            return null;
        } catch (error) {
            console.error("Error fetching places:", error.response?.data || error.message);
            return null;
        }
    }

    useEffect(() => {
        const fetchAllPhotos = async () => {
            const newPhotoUrls = {};
            for (const day of trip?.tripData?.Itinerary || []) {
                for (const place of day.Plan || []) {
                    if (!photoUrls[place.PlaceName]) {
                        const photoUrl = await getPlacePhoto(place.PlaceName);
                        if (photoUrl) {
                            newPhotoUrls[place.PlaceName] = photoUrl;
                        }
                    }
                }
            }
            setPhotoUrls(prev => ({ ...prev, ...newPhotoUrls }));
        };

        fetchAllPhotos();
    }, [trip]);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Places to Visit</h2>
            <div>
                {trip?.tripData?.Itinerary?.map((dayItem, index) => (
                    <div key={`day-${index}`} className="mb-8">
                        <h3 className="text-xl font-bold mb-4">{dayItem.Day}</h3>
                        <div className="space-y-6">
                            {dayItem.Plan?.map((place, placeIndex) => (
                                <div
                                    key={`place-${index}-${placeIndex}`}
                                    className="flex flex-col"
                                >
                                    <div className="text-orange-500 mb-2">
                                        {place.TimeSlot}
                                    </div>

                                    <div className="flex gap-4 bg-white rounded-lg p-4 shadow-sm">
                                        <img
                                            src={photoUrls[place.PlaceName] || 'placeholder-image-url'}
                                            alt={place.PlaceName}
                                            className="w-[130px] h-[130px] rounded-lg object-cover"
                                        />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h4 className="text-lg font-semibold">{place.PlaceName}</h4>
                                                {place.Rating && (
                                                    <div className="text-yellow-400">
                                                        {'⭐'.repeat(place.Rating)} {place.Rating} stars
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-sm text-gray-600 mt-1">
                                                {place.PlaceDetails}
                                            </div>
                                            <div className="flex flex-col mt-2 text-sm text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <span>🕒</span>
                                                    <span className="font-bold text-orange-500">{place.Time}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <CurrencyConverter price={place.TicketPricing} />
                                                </div>
                                                <Link 
                                                    to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                                        `${place.PlaceName} `
                                                    )}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Button className="border rounded-md hover:scale-105 transition-all duration-300 mt-5 text-white w-[100px]">
                                                        <FaMapMarkedAlt />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlacesToVisit;