import React, { useEffect, useState, useMemo } from "react";
import CurrencyConverter from "./CurrencyConverter";

import { FaMapMarkedAlt } from "react-icons/fa";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { getPlaces, PHOTO_REF_URL } from "@/services/GlobalApi";

function PlacesToVisit({ trip, location }) {
    const [photoUrls, setPhotoUrls] = useState({});

    // Add debug logs
    useEffect(() => {
        console.log('Trip data:', trip);
        console.log('Trip itinerary:', trip?.tripData?.Itinerary);
    }, [trip]);

    // Add photo fetching effect
    useEffect(() => {
        if (trip?.tripData?.Itinerary) {
            getPlacesPhotos();
        }
    }, [trip?.tripData?.Itinerary]);

    const getPlacesPhotos = async () => {
        try {
            const newPhotoUrls = {};
            
            // Iterate through all places in the itinerary
            for (const dayData of Object.values(trip.tripData.Itinerary)) {
                const places = Array.isArray(dayData) ? dayData : [dayData];
                
                for (const place of places) {
                    const data = {
                        textQuery: place.Location,
                        languageCode: "en",
                    };

                    const result = await getPlaces(data);
                    
                    // Get the photo reference URL if available
                    const photoRefUrl = result.data?.places?.[0]?.photos?.[3]?.name
                        ? PHOTO_REF_URL.replace("{NAME}", result.data.places[0].photos[3].name)
                        : "/placeholder-image.jpg";

                    newPhotoUrls[place.Location] = photoRefUrl;
                }
            }
            
            setPhotoUrls(newPhotoUrls);
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
    };

    // Process itinerary data using useMemo to prevent recalculation on every render
    const itineraryData = useMemo(() => {
        if (!trip?.tripData?.Itinerary) return [];
        
        try {
            return Object.entries(trip.tripData.Itinerary)
                .map(([day, plans]) => ({
                    Day: day,
                    Plan: Array.isArray(plans) ? plans : [plans]
                }))
                .sort((a, b) => {
                    const dayA = parseInt((a?.Day || '0').replace(/\D/g, '')) || 0;
                    const dayB = parseInt((b?.Day || '0').replace(/\D/g, '')) || 0;
                    return dayA - dayB;
                });
        } catch (error) {
            console.error('Error processing itinerary data:', error);
            return [];
        }
    }, [trip?.tripData?.Itinerary]);

    // Early return if trip data isn't loaded yet
    if (!trip || !trip.tripData) {
        return (
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Places to Visit</h2>
                <p className="text-gray-500">Loading itinerary...</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Places to Visit</h2>
            <div>
                {itineraryData.length > 0 ? (
                    itineraryData.map((dayData, index) => (
                        <div key={dayData.Day} className="mb-8">
                            <h3 className="text-2xl font-semibold mb-6">{dayData.Day}</h3>
                            <div className="space-y-4">
                                {dayData.Plan && dayData.Plan.map((place, placeIndex) => (
                                    <div
                                        key={`${dayData.Day}-${placeIndex}`}
                                        className="bg-white rounded-lg p-6 shadow-sm"
                                    >
                                        <div className="flex gap-6">
                                            <div className="w-[200px] h-[200px] bg-gray-100 rounded-lg">
                                                <img 
                                                    src={photoUrls[place.Location] || '/placeholder-image.jpg'} 
                                                    alt={place.Location} 
                                                    className="w-full h-full object-cover rounded-lg"
                                                    
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h2 className="text-xl font-semibold mb-2">{place.Location}</h2>
                                                <p className="text-gray-600 mb-4">{place.PlaceDetails}</p>
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <span>🕒</span>
                                                        <span>{place.Time}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <CurrencyConverter price={place.TicketPricing || 'Free'} />
                                                    </div>
                                                    <Link 
                                                        to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                                            `${place.Location}`
                                                        )}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Button className="mt-4 bg-black hover:bg-gray-800">
                                                            <FaMapMarkedAlt className="mr-2" />
                                                            View on Map
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No itinerary available</p>
                )}
            </div>
        </div>
    );
}

export default PlacesToVisit;