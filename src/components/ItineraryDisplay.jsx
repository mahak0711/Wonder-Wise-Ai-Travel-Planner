import React from 'react';

function ItineraryDisplay({ itinerary }) {
  if (!itinerary) return null;

  return (
    <div className="itinerary-display bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-white">
      {/* Introduction */}
      <div className="mb-8">
        <h3 className="text-3xl font-bold mb-4 font-inknut">Your Travel Itinerary</h3>
        <p className="text-lg font-poppins">{itinerary.introduction}</p>
      </div>

      {/* Daily Itineraries */}
      <div className="space-y-8">
        {itinerary.days.map((day, index) => (
          <div key={index} className="bg-white/5 rounded-2xl p-6">
            <h4 className="text-2xl font-bold mb-4 font-inknut">Day {index + 1}</h4>
            
            {/* Morning */}
            <div className="mb-4">
              <h5 className="text-xl font-semibold text-purple-300 mb-2">Morning</h5>
              <ul className="list-disc list-inside space-y-2 font-poppins">
                {day.morning.map((activity, i) => (
                  <li key={i}>{activity}</li>
                ))}
              </ul>
            </div>

            {/* Lunch */}
            <div className="mb-4">
              <h5 className="text-xl font-semibold text-purple-300 mb-2">Lunch</h5>
              <p className="font-poppins">{day.lunch}</p>
            </div>

            {/* Afternoon */}
            <div className="mb-4">
              <h5 className="text-xl font-semibold text-purple-300 mb-2">Afternoon</h5>
              <ul className="list-disc list-inside space-y-2 font-poppins">
                {day.afternoon.map((activity, i) => (
                  <li key={i}>{activity}</li>
                ))}
              </ul>
            </div>

            {/* Dinner */}
            <div className="mb-4">
              <h5 className="text-xl font-semibold text-purple-300 mb-2">Dinner</h5>
              <p className="font-poppins">{day.dinner}</p>
            </div>

            {/* Evening */}
            {day.evening && (
              <div className="mb-4">
                <h5 className="text-xl font-semibold text-purple-300 mb-2">Evening</h5>
                <ul className="list-disc list-inside space-y-2 font-poppins">
                  {day.evening.map((activity, i) => (
                    <li key={i}>{activity}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Accommodation */}
            <div>
              <h5 className="text-xl font-semibold text-purple-300 mb-2">Accommodation</h5>
              <p className="font-poppins">{day.accommodation}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Travel Tips */}
      <div className="mt-8 bg-purple-900/30 rounded-2xl p-6">
        <h4 className="text-2xl font-bold mb-4 font-inknut">Travel Tips</h4>
        <ul className="list-disc list-inside space-y-2 font-poppins">
          {itinerary.tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ItineraryDisplay;
