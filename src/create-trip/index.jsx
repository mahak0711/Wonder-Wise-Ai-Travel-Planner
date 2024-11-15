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

    try {
      if (!currentUser) {
        throw new Error('Please sign in to generate a trip');
      }

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
    } finally {
      setIsLoading(false);
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
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900">
      {/* Destination Section */}
      <section className="max-w-4xl mx-auto mb-20 relative">
        <h2 className="text-4xl font-bold text-white mb-8 font-inknut text-center">
          Where would you like to go?
        </h2>
        <div className="relative">
          <input
            ref={autocompleteRef}
            type="text"
            placeholder="Enter a destination"
            className="w-full px-6 py-4 bg-white/10 border border-purple-300/30 rounded-xl text-white placeholder-purple-300/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm text-xl"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          />
          <FaMapMarkerAlt className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400 text-xl" />
        </div>
      </section>

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
          </div>
        </div>
      )}

      {/* Itinerary Display Section */}
      {itinerary && (
        <section className="itinerary-section max-w-4xl mx-auto mt-12 p-6 bg-white/10 rounded-xl">
          <h2 className="text-3xl font-bold text-white mb-6">Your Travel Itinerary</h2>
          
          {/* Introduction */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">About Your Destination</h3>
            <p className="text-purple-200">{itinerary.introduction}</p>
          </div>

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
    </div>
  );
}

export default CreateTrip;