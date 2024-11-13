import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const modal = genAI.getGenerativeModal({
  model: "gemini-1.5-flash",
});

const generationConfig = {
    temprature:1,
    topP:0.95,
    topK:64,
    maxOutputToken:8192,
    reponseMimeType:"application/json",
}


export  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for 3 days with each day plan with best time to visit in JSON format.\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"tripDetails\": {\n    \"location\": \"Las Vegas, Nevada\",\n    \"duration\": \"3 Days\",\n    \"travelers\": \"Couple\",\n    \"budget\": \"Cheap\"\n  },\n  \"hotels\": [\n    {\n      \"hotelName\": \"Excalibur Hotel & Casino\",\n      \"hotelAddress\": \"3850 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": \"$30-$70/night (Varies by season and availability)\",\n      \"hotelImageUrl\": \"https://example.com/excalibur.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.0996,\n        \"longitude\": -115.1715\n      },\n      \"rating\": 3.5,\n      \"description\": \"Affordable medieval-themed hotel with a casino, pools, and restaurants.\"\n    },\n    {\n      \"hotelName\": \"Luxor Hotel and Casino\",\n      \"hotelAddress\": \"3900 S Las Vegas Blvd, Las Vegas, NV 89119\",\n      \"price\": \"$40-$80/night (Varies by season and availability)\",\n      \"hotelImageUrl\": \"https://example.com/luxor.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.0954,\n        \"longitude\": -115.1762\n      },\n      \"rating\": 3.5,\n      \"description\": \"Ancient Egyptian-themed hotel with an iconic pyramid shape, casino, and entertainment venues.\"\n    },\n        {\n      \"hotelName\": \"Motel 6 Las Vegas Tropicana\",\n      \"hotelAddress\": \"4100 Tropicana Ave, Las Vegas, NV 89103\",\n      \"price\": \"$40-$60/night (Varies by season and availability)\",\n      \"hotelImageUrl\": \"https://example.com/motel6.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.0993,\n        \"longitude\": -115.1544\n      },\n      \"rating\": 2.5,\n      \"description\": \"Budget-friendly motel option located just off the Strip.\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"bestTimeToVisit\": \"Afternoon/Evening\",\n      \"places\": [\n        {\n          \"placeName\": \"Welcome to Las Vegas Sign\",\n          \"placeDetails\": \"Iconic photo opportunity.\",\n          \"placeImageUrl\": \"https://example.com/welcome_sign.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1135,\n            \"longitude\": -115.175\n          },\n          \"ticketPricing\": \"Free\",\n          \"timeToTravel\": \"30 minutes\"\n        },\n        {\n          \"placeName\": \"Fremont Street Experience\",\n          \"placeDetails\": \"Light show and live entertainment in downtown Las Vegas.\",\n          \"placeImageUrl\": \"https://example.com/fremont_street.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1695,\n            \"longitude\": -115.1439\n          },\n          \"ticketPricing\": \"Free\",\n          \"timeToTravel\": \"45 minutes (from Welcome sign)\"\n        }\n      ]\n    },\n    \"day2\": {\n      \"bestTimeToVisit\": \"Daytime\",\n      \"places\": [\n        {\n          \"placeName\": \"The Strip (Walk/Explore)\",\n          \"placeDetails\": \"See the famous casinos and resorts.\",\n          \"placeImageUrl\": \"https://example.com/strip.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1097,\n            \"longitude\": -115.175\n          },\n          \"ticketPricing\": \"Free (except for specific attractions inside casinos)\",\n          \"timeToTravel\": \"Variable (depends on walking distance)\"\n        },\n        {\n          \"placeName\": \"Bellagio Conservatory & Botanical Garden\",\n          \"placeDetails\": \"Stunning floral displays.\",\n          \"placeImageUrl\": \"https://example.com/bellagio.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.113,\n            \"longitude\": -115.1761\n          },\n          \"ticketPricing\": \"Free\",\n          \"timeToTravel\": \"30 minutes (from average Strip location)\"\n        }\n      ]\n    },\n    \"day3\": {\n      \"bestTimeToVisit\": \"Anytime\",\n      \"places\": [\n        {\n          \"placeName\": \"High Roller Observation Wheel\",\n          \"placeDetails\": \"Panoramic city views from a giant Ferris wheel.\",\n          \"placeImageUrl\": \"https://example.com/high_roller.jpg\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1177,\n            \"longitude\": -115.1761\n          },\n          \"ticketPricing\": \"$25-$35 (depending on time of day)\",\n          \"timeToTravel\": \"15 minutes (from Bellagio)\"\n        },\n        {\n          \"placeName\": \"In-N-Out Burger (or other affordable dining)\",\n          \"placeDetails\": \"Classic West Coast burger chain.\",\n          \"placeImageUrl\": \"https://example.com/innout.jpg\",\n          \"geoCoordinates\": { \n            \"latitude\": \"36.1168\",\n            \"longitude\": \"-115.1536\"\n          },\n\n          \"ticketPricing\": \"$5-$10\",\n          \"timeToTravel\": \"30 minutes (from High Roller)\"\n        }\n      ]\n    }\n  }\n}\n```\n\n\nRemember to replace the example image URLs with actual URLs. Also, prices and travel times are estimates and can vary depending on traffic, time of year, and availability.  This provides a good starting point, but research specific locations and attractions for the most up-to-date information.  It's also beneficial to check websites like Groupon or other discount sites for potential deals on attractions and shows."},
        ],
      },
    ],
  });

 