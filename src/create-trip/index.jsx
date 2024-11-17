<<<<<<< HEAD
import { AI_PROMPT, SelectBudgetOption, SelectTravelsList } from '@/constants/options';
import { chatSession } from '@/services/Almodal';
import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { toast } from 'sonner';
import { FcGoogle } from "react-icons/fc";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/services/fireBaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { auth } from "@/services/fireBaseConfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
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
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [tripResponse, setTripResponse] = useState(null); // New state for the response
  const [openDialoge, setOpenDialoge] = useState(false);
  const [user, setUser] = useState(null);
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (name, value) => {
    if (name === 'numberOfDays' && value > 5) {
      console.log("Please enter a valid number of days");
      return;
    }
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleGoogleSignIn = async () => {
=======
import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '../contexts/UserContext';
import { FaMapMarkerAlt, FaCalendarAlt, FaWallet, FaUsers } from 'react-icons/fa';
import axios from 'axios';

function CreateTrip() {
  const { currentUser } = useUser();
  const [formData, setFormData] = useState({
    location: '',
    days: '',
    budgetCategory: '',
    travelGroup: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [itinerary, setItinerary] = useState(null);
  const autocompleteRef = useRef(null);

  // Define budget categories with proper mapping
  const budgetCategories = [
    {
      id: 'cheap',
      title: 'Budget Friendly',
      description: 'Best value for money',
      icon: '💰',
      range: { min: 50, max: 100 }
    },
    {
      id: 'moderate',
      title: 'Moderate',
      description: 'Balance of comfort and cost',
      icon: '💎',
      range: { min: 100, max: 300 }
    },
    {
      id: 'luxury',
      title: 'Luxury',
      description: 'Premium experience',
      icon: '👑',
      range: { min: 300, max: 1000 }
    }
  ];

  // Define travel groups with proper mapping
  const travelGroups = [
    {
      id: 'solo',
      title: 'Solo',
      description: 'Travel alone',
      icon: '🚶'
    },
    {
      id: 'couple',
      title: 'Couple',
      description: 'Romantic getaway',
      icon: '💑'
    },
    {
      id: 'family',
      title: 'Family',
      description: 'Family vacation',
      icon: '👨‍👩‍👧‍👦'
    },
    {
      id: 'friends',
      title: 'Friends',
      description: 'Group adventure',
      icon: '👥'
    }
  ];

  useEffect(() => {
    let autocompleteInstance = null;

    const initAutocomplete = () => {
      if (!autocompleteRef.current || !window.google) return;

      try {
        autocompleteInstance = new window.google.maps.places.Autocomplete(
          autocompleteRef.current,
          {
            types: ['(cities)'],
            fields: ['formatted_address', 'name']
          }
        );

        autocompleteInstance.addListener('place_changed', () => {
          const place = autocompleteInstance.getPlace();
          if (place.formatted_address) {
            setFormData(prev => ({
              ...prev,
              location: place.formatted_address
            }));
          }
        });
      } catch (error) {
        console.error('Error initializing Google Places:', error);
      }
    };

    const loadGoogleMapsScript = () => {
      if (window.google) {
        initAutocomplete();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.defer = true;
      script.async = true;
      script.onerror = () => console.error('Error loading Google Maps script');
      script.onload = initAutocomplete;
      document.head.appendChild(script);
    };

    loadGoogleMapsScript();

    return () => {
      if (autocompleteInstance) {
        window.google.maps.event.clearInstanceListeners(autocompleteInstance);
      }
    };
  }, []);

  const handleGenerateTrip = async (e) => {
    if (e) e.preventDefault();

>>>>>>> 2c1e06649c7c4fef724064074496bbcd3defbe55
    try {
      const provider = new GoogleAuthProvider();

<<<<<<< HEAD
      const result = await signInWithPopup(auth, provider);
      
      const userData = {
        email: result.user.email,
        name: result.user.displayName,
        picture: result.user.photoURL,
        firebaseUid: result.user.uid
      };
      
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
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is signed in:", user.uid);
        const userData = {
          email: user.email,
          name: user.displayName,
          picture: user.photoURL,
          firebaseUid: user.uid
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        console.log("No user is signed in");
      }
    });

    return () => unsubscribe();
  }, []);

  const OnGenerateTrip = async () => {
    localStorage.getItem('user');

    if (!user) {
      setOpenDialoge(true);
      // toast("Please login to generate trip");
      return;
    }


    if (formData?.numberOfDays > 5 && !formData?.location || !formData?.budget || !formData?.travelers) {
      toast("Please fill all the fields");
      return;
    }
    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.numberOfDays)
      .replace('{traveler}', formData?.travelers)
      .replace('{budget}', formData?.budget);

    console.log(FINAL_PROMPT);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    const responseText = await result?.response?.text();

    // console.log(responseText);
    // setTripResponse(responseText); // Store response in state
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    let docId; // Declare docId in function scope
    
    try {
      // Check if user is authenticated
      const currentUser = auth.currentUser;
      if (!currentUser) {
        toast.error("Please sign in to save your trip");
        setOpenDialoge(true); // Open login dialog
        return;
      }

      const user = JSON.parse(localStorage.getItem('user'));
      docId = Date.now().toString(); // Assign to the outer scope variable
      
      await setDoc(doc(db, "AiTrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        userEmail: currentUser.email,
        userId: currentUser.uid,
        id: docId,
        createdAt: new Date().toISOString()
      });
      
      toast.success("Trip saved successfully!");
      navigate(`/view-trip/${docId}`); // Move navigation here
    } catch (error) {
      console.error("Error saving trip:", error);
      toast.error("Failed to save trip. Please try again.");
=======
      // Debug log for form data
      console.log('Form Data:', formData);
      console.log('Current User:', currentUser);

      // Validate all required fields with specific error messages
      if (!formData.location) throw new Error('Please enter a destination');
      if (!formData.days) throw new Error('Please enter number of days');
      if (!formData.budgetCategory) throw new Error('Please select a budget category');
      if (!formData.travelGroup) throw new Error('Please select who you\'re traveling with');

      setIsLoading(true);
      setLoadingMessage('Crafting your perfect journey...');

      const selectedBudget = budgetCategories.find(b => b.id === formData.budgetCategory);
      if (!selectedBudget) throw new Error('Invalid budget category');

      const dailyBudget = `${selectedBudget.range.min}-${selectedBudget.range.max}`;

      // Create the payload
      const payload = {
        prompt: `Create a detailed ${formData.days}-day travel itinerary for ${formData.location}. 
          This is a ${formData.travelGroup} trip with a ${formData.budgetCategory} budget of $${dailyBudget} per day.
          
          Please format the response as follows:
          1. Start with a brief introduction about the destination
          2. For each day, include:
             - Morning activities with estimated times
             - Recommended lunch spots with price range
             - Afternoon activities with estimated times
             - Dinner recommendations with price range
             - Evening activities (if applicable)
             - Accommodation suggestions within the budget
          3. End with practical tips specific to the location and travel group`,
        userId: currentUser.uid || currentUser._id || currentUser.id,
        tripDetails: {
          location: formData.location,
          days: parseInt(formData.days),
          budgetCategory: formData.budgetCategory,
          travelGroup: formData.travelGroup
        }
      };

      // Debug log for payload
      console.log('Full payload:', JSON.stringify(payload, null, 2));

      const response = await axios.post('http://localhost:3000/api/trips/generate', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Server response:', response.data);

      if (response.data.success) {
        setItinerary(response.data.itinerary);
        setLoadingMessage('');
        // Scroll to itinerary section
        document.querySelector('.itinerary-section')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        throw new Error(response.data.error || 'Failed to generate itinerary');
      }

    } catch (error) {
      console.error('Error generating trip:', error);
      if (error.response?.data) {
        console.error('Server error details:', error.response.data);
        setLoadingMessage(error.response.data.error || 'Error generating trip. Please try again.');
      } else {
        setLoadingMessage(error.message || 'Error generating trip. Please try again.');
      }
>>>>>>> 2c1e06649c7c4fef724064074496bbcd3defbe55
    } finally {
      setLoading(false);
    }
  };

  const handleLocationChange = (value) => {
    console.log('Setting location:', value);
    setFormData(prev => ({ ...prev, location: value }));
  };

  const handleDaysChange = (value) => {
    console.log('Setting days:', value);
    setFormData(prev => ({ ...prev, days: value }));
  };

  const handleBudgetChange = (value) => {
    console.log('Setting budget:', value);
    setFormData(prev => ({ ...prev, budgetCategory: value }));
  };

  const handleTravelGroupChange = (value) => {
    console.log('Setting travel group:', value);
    setFormData(prev => ({ ...prev, travelGroup: value }));
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-16 font-poppins">
      <div className="w-full max-w-5xl bg-white p-16 rounded-xl shadow-xl border border-gray-200">
        <h2 className="text-5xl font-bold mb-8 text-center text-gray-800">
          Tell us your travel preferences <span role="img" aria-label="travel">🧳🌴</span>
        </h2>
        <p className="text-gray-600 mb-12 text-center text-2xl">
          Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
        </p>

        <div className="mb-10">
          <h2 className="block text-gray-700 font-semibold mb-4 text-2xl">What is your destination of choice?</h2>
          <GooglePlacesAutocomplete apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v) }
            }}
          />
        </div>

        <div className="mb-10">
          <h2 className="block text-gray-700 font-semibold mb-4 text-2xl">How many days are you planning for your trip?</h2>
=======
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900">
      {/* Destination Section */}
      <section className="max-w-4xl mx-auto mb-20 relative">
        <h2 className="text-4xl font-bold text-white mb-8 font-inknut text-center">
          Where would you like to go?
        </h2>
        <div className="relative">
>>>>>>> 2c1e06649c7c4fef724064074496bbcd3defbe55
          <input
            ref={autocompleteRef}
            type="text"
<<<<<<< HEAD
            placeholder="Ex. 3"
            className="w-full px-6 py-5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition text-xl"
            onChange={(e) => handleInputChange('numberOfDays', e.target.value)}
=======
            placeholder="Enter a destination"
            className="w-full px-6 py-4 bg-white/10 border border-purple-300/30 rounded-xl text-white placeholder-purple-300/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm text-xl"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
>>>>>>> 2c1e06649c7c4fef724064074496bbcd3defbe55
          />
          <FaMapMarkerAlt className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400 text-xl" />
        </div>
      </section>

<<<<<<< HEAD
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
          <div className='grid grid-cols-3 gap-5'>
            {SelectBudgetOption.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                ${formData?.budget === item.title && 'shadow-lg border-black'}
                `}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <p className='text-sm text-gray-500'>{item.desc}</p>
              </div>
            ))}
=======
      {/* Days Section */}
      <section className="max-w-4xl mx-auto mb-20">
        <h2 className="text-4xl font-bold text-white mb-8 font-inknut text-center">
          How long is your trip?
        </h2>
        <div className="relative">
          <input
            type="number"
            min="1"
            placeholder="Number of days"
            className="w-full px-6 py-4 bg-white/10 border border-purple-300/30 rounded-xl text-white placeholder-purple-300/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm text-xl"
            value={formData.days}
            onChange={(e) => setFormData(prev => ({ ...prev, days: e.target.value }))}
          />
          <FaCalendarAlt className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400 text-xl" />
        </div>
      </section>

      {/* Budget Category Section */}
      <section className="max-w-4xl mx-auto mb-20">
        <h2 className="text-4xl font-bold text-white mb-8 font-inknut text-center">
          What's your budget category?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {budgetCategories.map(category => (
            <div
              key={category.id}
              onClick={() => setFormData(prev => ({ ...prev, budgetCategory: category.id }))}
              className={`p-6 rounded-xl cursor-pointer transform transition-all duration-200 hover:scale-105 ${
                formData.budgetCategory === category.id
                  ? 'bg-purple-500/40 border-2 border-purple-300'
                  : 'bg-white/5 border border-purple-300/20 hover:bg-white/10'
              }`}
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
              <p className="text-purple-200/70">{category.description}</p>
              <p className="text-purple-200/70 mt-2">${category.range.min}-${category.range.max}/day</p>
            </div>
          ))}
        </div>
      </section>

      {/* Travel Group Section */}
      <section className="max-w-4xl mx-auto mb-20">
        <h2 className="text-4xl font-bold text-white mb-8 font-inknut text-center">
          Who are you traveling with?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {travelGroups.map(group => (
            <div
              key={group.id}
              onClick={() => setFormData(prev => ({ ...prev, travelGroup: group.id }))}
              className={`p-6 rounded-xl cursor-pointer transform transition-all duration-200 hover:scale-105 ${
                formData.travelGroup === group.id
                  ? 'bg-purple-500/40 border-2 border-purple-300'
                  : 'bg-white/5 border border-purple-300/20 hover:bg-white/10'
              }`}
            >
              <div className="text-4xl mb-4">{group.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{group.title}</h3>
              <p className="text-purple-200/70">{group.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Generate Button */}
      <section className="max-w-4xl mx-auto">
        <button
          onClick={handleGenerateTrip}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-4 px-8 rounded-xl font-bold text-xl hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed font-poppins shadow-lg shadow-purple-500/20"
        >
          {isLoading ? 'Crafting Your Journey...' : 'Generate Trip'}
        </button>
      </section>

      {loadingMessage && (
        <div className="max-w-4xl mx-auto mt-8">
          <div className="p-4 bg-purple-800/30 rounded-xl text-white text-center font-poppins backdrop-blur-sm border border-purple-300/20">
            {loadingMessage}
>>>>>>> 2c1e06649c7c4fef724064074496bbcd3defbe55
          </div>
        </div>
      )}

<<<<<<< HEAD
        <div>
          <h2 className='text-xl my-3 font-medium'>Who do you plan to travel with?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelsList.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('travelers', item.people)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                ${formData?.travelers === item.people && 'shadow-lg border-black'}
                `}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <p className='text-sm text-gray-500'>{item.desc}</p>
              </div>
            ))}
=======
      {/* Itinerary Display Section */}
      {itinerary && (
        <section className="itinerary-section max-w-4xl mx-auto mt-12 p-6 bg-white/10 rounded-xl">
          <h2 className="text-3xl font-bold text-white mb-6">Your Travel Itinerary</h2>
          
          {/* Introduction */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">About Your Destination</h3>
            <p className="text-purple-200">{itinerary.introduction}</p>
>>>>>>> 2c1e06649c7c4fef724064074496bbcd3defbe55
          </div>

<<<<<<< HEAD
        <div className="text-center mt-12">
          <button
            disabled={Loading}
            onClick={OnGenerateTrip} className="px-10 py-5 bg-indigo-600 text-white font-semibold text-2xl rounded-lg shadow-lg hover:bg-indigo-700 transition">
            {Loading ?
              <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> :
              'Generate Trip'
            }
          </button>
        </div>
        <Dialog open={openDialoge}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="logo.png" className='w-[100px] h-[100px]' />
                <h2 className='text-2xl font-semibold'>Sign In with Google</h2>
                <p className='text-gray-500'>Sign in with Google to generate your trip</p>
                <Button
                  className='w-full'
                  onClick={handleGoogleSignIn}
                >
                  <FcGoogle className='mr-2' />
                  Sign in with Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>


        {tripResponse && (
          <div className="mt-10 p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Generated Trip Itinerary:</h2>
            <pre className="whitespace-pre-wrap text-gray-800">{tripResponse}</pre>
          </div>
        )}
      </div>
=======
          {/* Daily Itinerary */}
          {itinerary.days.map((day, index) => (
            <div key={index} className="mb-8 p-6 bg-white/5 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-4">Day {index + 1}</h3>
              
              {/* Morning */}
              {day.morning.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-purple-300">Morning</h4>
                  {day.morning.map((activity, i) => (
                    <p key={i} className="text-purple-200">{activity}</p>
                  ))}
                </div>
              )}

              {/* Lunch */}
              {day.lunch && (
                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-purple-300">Lunch</h4>
                  <p className="text-purple-200">{day.lunch}</p>
                </div>
              )}

              {/* Afternoon */}
              {day.afternoon.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-purple-300">Afternoon</h4>
                  {day.afternoon.map((activity, i) => (
                    <p key={i} className="text-purple-200">{activity}</p>
                  ))}
                </div>
              )}

              {/* Dinner */}
              {day.dinner && (
                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-purple-300">Dinner</h4>
                  <p className="text-purple-200">{day.dinner}</p>
                </div>
              )}

              {/* Evening */}
              {day.evening.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xl font-semibold text-purple-300">Evening</h4>
                  {day.evening.map((activity, i) => (
                    <p key={i} className="text-purple-200">{activity}</p>
                  ))}
                </div>
              )}

              {/* Accommodation */}
              {day.accommodation && (
                <div>
                  <h4 className="text-xl font-semibold text-purple-300">Accommodation</h4>
                  <p className="text-purple-200">{day.accommodation}</p>
                </div>
              )}
            </div>
          ))}

          {/* Travel Tips */}
          {itinerary.tips.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-white mb-4">Travel Tips</h3>
              <ul className="list-disc list-inside">
                {itinerary.tips.map((tip, index) => (
                  <li key={index} className="text-purple-200 mb-2">{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}
>>>>>>> 2c1e06649c7c4fef724064074496bbcd3defbe55
    </div>
  );
}
export default CreateTrip;

