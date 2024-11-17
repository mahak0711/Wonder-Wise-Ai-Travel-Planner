import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

function Hero() {
  const navigate = useNavigate();
  const { currentUser } = useUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold mb-6 font-inknut">
          Your Next Adventure Awaits
        </h1>
        
        <p className="text-xl mb-8 font-poppins">
          Let AI plan your perfect trip. Just tell us where you want to go, 
          and we'll create a personalized itinerary for you.
        </p>
        
        <div className="space-x-4">
          {currentUser ? (
            <button
              onClick={() => navigate('/create-trip')}
              className="bg-white text-purple-700 px-8 py-3 rounded-full font-semibold text-lg hover:bg-purple-100 transition-all duration-200 transform hover:scale-105"
            >
              Plan Your Trip
            </button>
          ) : (
            <button
              onClick={() => navigate('/signin')}
              className="bg-white text-purple-700 px-8 py-3 rounded-full font-semibold text-lg hover:bg-purple-100 transition-all duration-200 transform hover:scale-105"
            >
              Get Started
            </button>
          )}
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black to-transparent"></div>
    </div>
  );
}

export default Hero; 