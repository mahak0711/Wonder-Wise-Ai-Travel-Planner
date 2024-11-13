import React from 'react'

function CreateTrip() {
  return (
    <div className=' sm:px-10 md:px-32 lg:px-56 xl:px-10 mt-10'>

<div className="min-h-screen flex items-center justify-center bg-gray-100 p-16">
      <div className="w-full max-w-5xl bg-white p-16 rounded-xl shadow-xl border border-gray-200">
        <h2 className="text-5xl font-bold mb-8 text-center text-gray-800">
          Tell us your travel preferences <span role="img" aria-label="travel">🧳🌴</span>
        </h2>
        <p className="text-gray-600 mb-12 text-center text-2xl">
          Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
        </p>

        {/* Destination */}
        <div className="mb-10">
          <label className="block text-gray-700 font-semibold mb-4 text-2xl">What is your destination of choice?</label>
          <select className="w-full px-6 py-5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition text-xl">
            <option>Select...</option>
            {/* Add more options here */}
          </select>
        </div>

        {/* Duration */}
        <div className="mb-10">
          <label className="block text-gray-700 font-semibold mb-4 text-2xl">How many days are you planning for your trip?</label>
          <input
            type="text"
            placeholder="Ex. 3"
            className="w-full px-6 py-5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition text-xl"
          />
        </div>

        {/* Budget */}
        <div className="mb-10">
          <label className="block text-gray-700 font-semibold mb-4 text-2xl">What is your budget?</label>
          <div className="flex gap-8">
            <div className="flex-1 p-10 border rounded-lg hover:bg-gray-100 text-center cursor-pointer transition-shadow shadow-sm hover:shadow-lg">
              <span role="img" aria-label="cheap" className="block text-green-500 text-4xl mb-4">💲</span>
              <p className="font-semibold text-2xl">Cheap</p>
              <p className="text-gray-500 text-lg">Stay conscious of costs</p>
            </div>
            <div className="flex-1 p-10 border rounded-lg hover:bg-gray-100 text-center cursor-pointer transition-shadow shadow-sm hover:shadow-lg">
              <span role="img" aria-label="moderate" className="block text-yellow-500 text-4xl mb-4">💰</span>
              <p className="font-semibold text-2xl">Moderate</p>
              <p className="text-gray-500 text-lg">Keep costs on the average side</p>
            </div>
            <div className="flex-1 p-10 border rounded-lg hover:bg-gray-100 text-center cursor-pointer transition-shadow shadow-sm hover:shadow-lg">
              <span role="img" aria-label="luxury" className="block text-teal-500 text-4xl mb-4">💳</span>
              <p className="font-semibold text-2xl">Luxury</p>
              <p className="text-gray-500 text-lg">Don't worry about cost</p>
            </div>
          </div>
        </div>

        {/* Travel Companions */}
        <div className="mb-10">
          <label className="block text-gray-700 font-semibold mb-4 text-2xl">Who do you plan on traveling with?</label>
          <div className="flex gap-8 flex-wrap">
            <div className="flex-1 p-10 border rounded-lg hover:bg-gray-100 text-center cursor-pointer transition-shadow shadow-sm hover:shadow-lg">
              <span role="img" aria-label="just me" className="block text-blue-500 text-4xl mb-4">🧍</span>
              <p className="font-semibold text-2xl">Just Me</p>
              <p className="text-gray-500 text-lg">A solo explorer</p>
            </div>
            <div className="flex-1 p-10 border rounded-lg hover:bg-gray-100 text-center cursor-pointer transition-shadow shadow-sm hover:shadow-lg">
              <span role="img" aria-label="couple" className="block text-red-500 text-4xl mb-4">👫</span>
              <p className="font-semibold text-2xl">A Couple</p>
              <p className="text-gray-500 text-lg">Two travelers together</p>
            </div>
            <div className="flex-1 p-10 border rounded-lg hover:bg-gray-100 text-center cursor-pointer transition-shadow shadow-sm hover:shadow-lg">
              <span role="img" aria-label="family" className="block text-green-500 text-4xl mb-4">👨‍👩‍👧‍👦</span>
              <p className="font-semibold text-2xl">Family</p>
              <p className="text-gray-500 text-lg">Fun for all ages</p>
            </div>
            <div className="flex-1 p-10 border rounded-lg hover:bg-gray-100 text-center cursor-pointer transition-shadow shadow-sm hover:shadow-lg">
              <span role="img" aria-label="friends" className="block text-purple-500 text-4xl mb-4">⛵</span>
              <p className="font-semibold text-2xl">Friends</p>
              <p className="text-gray-500 text-lg">A bunch of thrill-seekers</p>
            </div>
          </div>
        </div>

        {/* Generate Trip Button */}
        <div className="text-center mt-12">
          <button className="px-10 py-5 bg-indigo-600 text-white font-semibold text-2xl rounded-lg shadow-lg hover:bg-indigo-700 transition">
            Generate Trip
          </button>
        </div>
      </div>
    </div>

    </div>
  )
}

export default CreateTrip
