import { AI_PROMPT, SelectBudgetOption, SelectTravelsList } from '@/constants/options';
import { chatSession } from '@/services/Almodal';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';
<<<<<<< Updated upstream
import { FcGoogle} from "react-icons/fc";
import { useNavigate } from 'react-router-dom';

=======
import { FcGoogle } from "react-icons/fc";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/services/fireBaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {auth} from "@/services/fireBaseConfig"
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
>>>>>>> Stashed changes
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
<<<<<<< Updated upstream
import { useUser } from '../contexts/UserContext';


function CreateTrip() {
  const { currentUser } = useUser();
=======

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const retryWithDelay = async (fn, retries = 3, delayMs = 2000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      if (error.message?.includes('503') || error.message?.includes('overloaded')) {
        await delay(delayMs * (i + 1)); // Exponential backoff
        continue;
      }
      throw error;
    }
  }
};

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialoge, setOpenDialoge] = useState(false);
  const [user, setUser] = useState(null);
  const [Loading, setLoading] = useState(false);
>>>>>>> Stashed changes
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/signin');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return <div>Please sign in to continue...</div>;
  }

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
      if (!currentUser) {
        throw new Error('Please sign in to generate a trip');
      }

      setIsLoading(true);
      setLoadingMessage('Generating your perfect trip...');
      
      const tripData = {
        location,
        days,
        budget,
        travelCompanions,
        userId: currentUser._id
      };
      
<<<<<<< Updated upstream
      const response = await fetch('http://localhost:5173/api/trips/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tripData),
=======
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setOpenDialoge(false);
      
      if (typeof OnGenerateTrip === 'function') {
        OnGenerateTrip();
      }

    } catch (error) {
      console.error("Authentication error:", error);
      toast.error("Failed to sign in. Please try again");
    }
  };

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const userData = {
            email: result.user.email,
            name: result.user.displayName,
            picture: result.user.photoURL,
            firebaseUid: result.user.uid
          };
          
          localStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
          setOpenDialoge(false);
          OnGenerateTrip();
        }
      } catch (error) {
        console.error("Redirect result error:", error);
        toast.error("Failed to complete sign in. Please try again.");
      }
    };

    handleRedirectResult();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in:', user.uid);
      } else {
        console.log('No user is signed in');
      }
    });

    return () => unsubscribe();
  }, []);

  const OnGenerateTrip = async () => {
    localStorage.getItem('user');

    if (!user) {
      setOpenDialoge(true);
      return;
    }

    if (formData?.numberOfDays > 5 && !formData?.location || !formData?.budget || !formData?.travelers) {
      toast("Please fill all the fields");
      return;
    }
    
    setLoading(true);
    
    try {
      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', formData?.location?.label)
        .replace('{totalDays}', formData?.numberOfDays)
        .replace('{traveler}', formData?.travelers)
        .replace('{budget}', formData?.budget);

      console.log(FINAL_PROMPT);
      
      const result = await retryWithDelay(async () => {
        const response = await chatSession.sendMessage(FINAL_PROMPT);
        return response;
      });
      
      SaveAiTrip(result?.response?.text());
    } catch (error) {
      console.error("AI Generation Error:", error);
      if (error.message?.includes('503') || error.message?.includes('overloaded')) {
        toast.error("The AI service is still overloaded after multiple attempts. Please try again later.");
      } else {
        toast.error("Failed to generate trip. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    
    try {
      // Check if user is authenticated
      const currentUser = auth.currentUser;
      if (!currentUser) {
        toast.error("Please sign in to save your trip");
        setOpenDialoge(true);
        return;
      }

      const docId = Date.now().toString();
      
      // Ensure all required fields are present
      await setDoc(doc(db, "AiTrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        userEmail: currentUser.email,
        userId: currentUser.uid,  // This is crucial for the security rules
        id: docId,
        createdAt: new Date().toISOString()
>>>>>>> Stashed changes
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      setItinerary(responseData);
      console.log('Trip generated successfully');
      
<<<<<<< Updated upstream
=======
      toast.success("Trip saved successfully!");
      navigate(`/view-trip/${docId}`);
>>>>>>> Stashed changes
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