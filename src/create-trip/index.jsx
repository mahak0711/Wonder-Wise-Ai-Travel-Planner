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
  const [location, setLocation] = useState('');
  const [days, setDays] = useState('');
  const [budget, setBudget] = useState('');
  const [travelCompanions, setTravelCompanions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState('Generating your perfect trip...');

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

useEffect(() => {
  if (!window.google) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }
}, []);

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

  const handleGenerateTrip = async () => {
    try {
      setIsLoading(true);
      setLoadingMessage('Generating your perfect trip...');
      
      const tripData = {
        location,
        days,
        budget,
        travelCompanions
      };
      
      // Make API call
      const response = await fetch('your_api_endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tripData),
      });

      const responseData = await response.json();
      setItinerary(responseData);
      console.log('Trip generated successfully');
      
    } catch (error) {
      console.error('Error generating trip:', error);
      setLoadingMessage('Error generating trip. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-16 font-poppins">
      <div className="w-full max-w-5xl bg-white p-16 rounded-xl shadow-xl border border-gray-200">
        {/* Other code remains the same */}

        <div className="mb-10">
          <h2 className="block text-gray-700 font-semibold mb-4 text-2xl">What is your destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              onChange: setLocation,
            }}
          />
        </div>

        <div className="mb-10">
          <h2 className="block text-gray-700 font-semibold mb-4 text-2xl">How many days are you planning for your trip?</h2>
          <input
            type="text"
            placeholder="Ex. 3"
            className="w-full px-6 py-5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition text-xl"
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
            ))}
          </div>
        </div>

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
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
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
          <div className="loading-overlay">
            <p>{loadingMessage}</p>
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
      </div>
    </div>
  );
}

export default CreateTrip;