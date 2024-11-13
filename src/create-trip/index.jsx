<<<<<<< Updated upstream
import { AI_PROMPT, SelectBudgetOption, SelectTravelsList } from '@/constants/options';
import { chatSession } from '@/services/Almodal';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';
import { FcGoogle} from "react-icons/fc";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';


function CreateTrip() {
  const [place,setPlace]=useState();
  const [openDialoge,setOpenDialoge]=useState(false);
  const[formData,setFormData]=useState([]);

  const handleInputChange=(name,value)=>{
    if(name=='numbeOfDays' && value>5 ){
      console.log("Please enter a valid days");
      return;
    }
    setFormData({
      ...formData,
      [name]:value
    })
  }

useEffect(()=>{
console.log(formData);
},[formData])


const OnGenerateTrip=async()=>{
  const user=localStorage.getItem('user');
  if(!user){
    setOpenDialoge(true);
    toast("Please login to generate trip");
    return;
  }
  if(formData?.numberOfDays>5 &&! formData?.location ||!formData?.budget ||!formData?.travelers){
  toast("Please fill all the fields");
    return;
}
const FINAL_PROMPT=AI_PROMPT
.replace('{location}',formData?.location?.label)
.replace('{totalDays}',formData?.numberOfDays)
.replace('{traveler}',formData?.travelers)
.replace('{budget}',formData?.budget)

console.log(FINAL_PROMPT);
const result=await chatSession.sendMessage(FINAL_PROMPT);
console.log(result?.response?.text());
}
const getUserProfile=(tokenInfo)=>{
  axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
    headers: {
      Authorization: `Bearer ${tokenInfo?.access_token}`,
      Accept: 'application/json'
    }
  }).then((res)=>{
    console.log(res);
    localStorage.setItem('user',JSON.stringify(res?.data));
    setOpenDialoge(false);
    OnGenerateTrip();
  })
}
=======
import React, { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

function CreateTrip() {
  const [location, setLocation] = useState(null);
  const [days, setDays] = useState('');
  const [budget, setBudget] = useState('');
  const [travelCompanions, setTravelCompanions] = useState('');
  const [itinerary, setItinerary] = useState(null);
  const [tripImages, setTripImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const loadingMessages = [
    "Planning your perfect trip...",
    "Finding the best spots...",
    "Crafting your itinerary...",
    "Almost there..."
  ];

  // Handle Generate Trip Button Click
  const handleGenerateTrip = async () => {
    if (!location || !days || !budget || !travelCompanions) {
      alert("Please fill all the fields");
      return;
    }
  
    setIsLoading(true);
    setTripImages([]);
    setItinerary(null);
  
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      setLoadingMessage(loadingMessages[messageIndex]);
      messageIndex = (messageIndex + 1) % loadingMessages.length;
    }, 2000);
  
    try {
      // Fetch images
      const locationName = location.label.split(',')[0];
      const images = await fetchLocationImages(locationName);
      setTripImages(images);
  
      // Updated prompt for cleaner formatting
      const prompt = `Create a ${days}-day travel guide for ${location.label} for ${travelCompanions} with a ${budget} budget.

Please format the response as follows:

MUST-VISIT ATTRACTIONS
1. [Attraction name]: Brief description
2. [Attraction name]: Brief description
3. [Attraction name]: Brief description

UNIQUE LOCAL EXPERIENCE
[Experience name]: Brief description

BEST TIME TO VISIT
[Season/months] and why

RECOMMENDED RESTAURANT
[Restaurant name]: Type of cuisine and price range

ESTIMATED DAILY BUDGET
[Amount] including accommodation, food, and activities

TRAVEL TIPS
1. [First tip]
2. [Second tip]
3. [Third tip]

Please avoid using special characters like asterisks (*) or hashtags (#) in the response.`;
  
      const requestBody = {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 500,
        }
      };
  
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAQM_4HT676H1cnEE7qTnrFu9qGpaprA38", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) {
        throw new Error('Failed to generate itinerary');
      }
  
      const result = await response.json();
      const generatedText = result.candidates[0].content.parts[0].text;
      
      // Clean up any remaining special characters
      const cleanedText = generatedText
        .replace(/[#*]/g, '')
        .replace(/\n\n+/g, '\n\n')
        .trim();
      
      setItinerary(cleanedText);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate itinerary. Please try again.');
    } finally {
      setIsLoading(false);
      clearInterval(messageInterval);
    }
  };
  
  const fetchLocationImages = async (location) => {
    const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${location} landmarks&per_page=3&orientation=landscape`,
        {
          headers: {
            'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
          }
        }
      );
      const data = await response.json();
      return data.results.map(img => ({
        url: img.urls.regular,
        alt: img.alt_description || location,
        credit: img.user.name
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
      return [];
    }
  };
  
  
  
  

>>>>>>> Stashed changes
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-16 font-poppins">
      <div className="w-full max-w-5xl bg-white p-16 rounded-xl shadow-xl border border-gray-200">
        {/* Other code remains the same */}

<<<<<<< Updated upstream
        
        <div className="mb-10">
          <h2 className="block text-gray-700 font-semibold mb-4 text-2xl">What is your destination of choice?</h2>
         <GooglePlacesAutocomplete apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
         selectProps={{
          place,
          onChange:(v)=>{setPlace(v);handleInputChange('location',v)}
         }}
         />
          
        </div>



        {/* Duration */}
=======
        <div className="mb-10">
          <h2 className="block text-gray-700 font-semibold mb-4 text-2xl">What is your destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              onChange: setLocation,
            }}
          />
        </div>

>>>>>>> Stashed changes
        <div className="mb-10">
          <h2 className="block text-gray-700 font-semibold mb-4 text-2xl">How many days are you planning for your trip?</h2>
          <input
            type="text"
            placeholder="Ex. 3"
            className="w-full px-6 py-5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition text-xl"
<<<<<<< Updated upstream
          onChange={(e)=>handleInputChange('numbeOfDays',e.target.value)}
          />
        </div>
        {/* here the fake code */}
      
         <div>
          <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
          <div className='grid grid-cols-3 gap-5'>
            {SelectBudgetOption.map((item,index)=>(
              <div key={index} 
              onClick={()=>handleInputChange('budget',item.title)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
              ${formData?.budget===item.title&&'shadow-lg border-black'}
              `}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <p className='text-sm text-gray-500'>{item.desc}</p>
                </div>
=======
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
        </div>

        <div className="mb-10">
          <label className="block text-gray-700 font-semibold mb-4 text-2xl">What is your budget?</label>
          <div className="flex gap-8">
            {['Cheap', 'Moderate', 'Luxury'].map((option) => (
              <div
                key={option}
                className={`flex-1 p-10 border rounded-lg hover:bg-gray-100 text-center cursor-pointer transition-shadow shadow-sm hover:shadow-lg ${budget === option ? 'border-indigo-500' : ''}`}
                onClick={() => setBudget(option)}
              >
                <span role="img" aria-label={option.toLowerCase()} className={`block text-4xl mb-4 ${option === 'Cheap' ? 'text-green-500' : option === 'Moderate' ? 'text-yellow-500' : 'text-teal-500'}`}>
                  {option === 'Cheap' ? '💲' : option === 'Moderate' ? '💰' : '💳'}
                </span>
                <p className="font-semibold text-2xl">{option}</p>
              </div>
>>>>>>> Stashed changes
            ))}
          </div>
         </div>

<<<<<<< Updated upstream
         <div>
          <h2 className='text-xl my-3 font-medium'>Who do you plan to travel with?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelsList.map((item,index)=>(
              <div key={index}
              onClick={()=>handleInputChange('travelers',item.people)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                ${formData?.travelers===item.people&&'shadow-lg border-black'}
              `}>            
                    <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <p className='text-sm text-gray-500'>{item.desc}</p>
                </div>
=======
        <div className="mb-10">
          <label className="block text-gray-700 font-semibold mb-4 text-2xl">Who do you plan on traveling with?</label>
          <div className="flex gap-8 flex-wrap">
            {['Just Me', 'A Couple', 'Family', 'Friends'].map((option) => (
              <div
                key={option}
                className={`flex-1 p-10 border rounded-lg hover:bg-gray-100 text-center cursor-pointer transition-shadow shadow-sm hover:shadow-lg ${travelCompanions === option ? 'border-indigo-500' : ''}`}
                onClick={() => setTravelCompanions(option)}
              >
                <span role="img" aria-label={option.toLowerCase()} className={`block text-4xl mb-4 ${option === 'Just Me' ? 'text-blue-500' : option === 'A Couple' ? 'text-red-500' : option === 'Family' ? 'text-green-500' : 'text-purple-500'}`}>
                  {option === 'Just Me' ? '🧍' : option === 'A Couple' ? '👫' : option === 'Family' ? '👨‍👩‍👧‍👦' : '⛵'}
                </span>
                <p className="font-semibold text-2xl">{option}</p>
              </div>
>>>>>>> Stashed changes
            ))}
          </div>
         </div>

        <div className="text-center mt-12">
<<<<<<< Updated upstream
          <button onClick={OnGenerateTrip} className="px-10 py-5 bg-indigo-600 text-white font-semibold text-2xl rounded-lg shadow-lg hover:bg-indigo-700 transition">
            Generate Trip
          </button>
        </div>
        <Dialog open={openDialoge}>
  <DialogContent>
    <DialogHeader>
      <DialogDescription>
      <img src="logo.png" className="w-[100p] h-[50px]"></img>
      <h2 className='font-bold text-lg mt-7'>Sign in with Google</h2>
      <p>Sign in to App with Google authentication securely</p>
      
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

=======
          <button
            onClick={handleGenerateTrip}
            disabled={isLoading}
            className={`px-10 py-5 bg-indigo-600 text-white font-semibold text-2xl rounded-lg shadow-lg transition
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
          >
            {isLoading ? 'Generating...' : 'Generate Trip'}
          </button>
        </div>

        {isLoading && (
          <div className="mt-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-xl text-indigo-600">{loadingMessage}</p>
          </div>
        )}

        {itinerary && (
          <div className="mt-12 p-8 bg-gray-50 rounded-lg shadow-inner">
            <h2 className="text-3xl font-bold mb-6 text-indigo-600">
              Your Travel Guide to {location.label}
            </h2>

            {tripImages.length > 0 && (
              <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {tripImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-64 object-cover rounded-lg shadow-md"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 rounded-b-lg">
                        Photo by {image.credit} on Unsplash
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                {itinerary}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                * This guide is AI-generated. Please verify details before making plans.
              </p>
            </div>
          </div>
        )}
>>>>>>> Stashed changes
      </div>
    </div>
  );
}

export default CreateTrip;