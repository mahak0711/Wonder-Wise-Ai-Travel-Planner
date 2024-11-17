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
    try {
      const provider = new GoogleAuthProvider();

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
    } finally {
      setLoading(false);
    }
  };

  return (
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
          <input
            type="text"
            placeholder="Ex. 3"
            className="w-full px-6 py-5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition text-xl"
            onChange={(e) => handleInputChange('numberOfDays', e.target.value)}
          />
        </div>

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
          </div>
        </div>

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
          </div>
        </div>

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
    </div>
  );
}
export default CreateTrip;

