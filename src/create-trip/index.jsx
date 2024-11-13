import React from 'react'

function CreateTrip() {
  return (
    <div className=' sm:px-10 md:px-32 lg:px-56 xl:px-10 mt-10'>

    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-2">Tell us your travel preferences <span role="img" aria-label="travel">🧳🌴</span></h2>
        <p className="text-gray-600 mb-6">Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>

        {/* Destination */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">What is destination of choice?</label>
          <select className="w-full px-4 py-2 border rounded-md">
            <option>Select...</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* Duration */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">How many days are you planning your trip?</label>
          <input
            type="text"
            placeholder="Ex. 3"
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Budget */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">What is Your Budget?</label>
          <div className="flex gap-4">
            <div className="flex-1 p-4 border rounded-md hover:bg-gray-100 text-center cursor-pointer">
              <span role="img" aria-label="cheap" className="block text-green-500 mb-2">💲</span>
              <p className="font-semibold">Cheap</p>
              <p className="text-gray-500 text-sm">Stay conscious of costs</p>
            </div>
            <div className="flex-1 p-4 border rounded-md hover:bg-gray-100 text-center cursor-pointer">
              <span role="img" aria-label="moderate" className="block text-yellow-500 mb-2">💰</span>
              <p className="font-semibold">Moderate</p>
              <p className="text-gray-500 text-sm">Keep cost on the average side</p>
            </div>
            <div className="flex-1 p-4 border rounded-md hover:bg-gray-100 text-center cursor-pointer">
              <span role="img" aria-label="luxury" className="block text-teal-500 mb-2">💳</span>
              <p className="font-semibold">Luxury</p>
              <p className="text-gray-500 text-sm">Don’t worry about cost</p>
            </div>
          </div>
        </div>

        {/* Travel Companions */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Who do you plan on traveling with on your next adventure?</label>
          <div className="flex gap-4">
            <div className="flex-1 p-4 border rounded-md hover:bg-gray-100 text-center cursor-pointer">
              <span role="img" aria-label="just me" className="block text-blue-500 mb-2">🧍</span>
              <p className="font-semibold">Just Me</p>
              <p className="text-gray-500 text-sm">A solo traveler</p>
            </div>
            <div className="flex-1 p-4 border rounded-md hover:bg-gray-100 text-center cursor-pointer">
              <span role="img" aria-label="couple" className="block text-red-500 mb-2">👫</span>
              <p className="font-semibold">A Couple</p>
              <p className="text-gray-500 text-sm">Two travelers in tandem</p>
            </div>
            <div className="flex-1 p-4 border rounded-md hover:bg-gray-100 text-center cursor-pointer">
              <span role="img" aria-label="family" className="block text-green-500 mb-2">👨‍👩‍👧‍👦</span>
              <p className="font-semibold">Family</p>
              <p className="text-gray-500 text-sm">A group of fun-loving adventurers</p>
            </div>
          </div>
        </div>
      </div>
    </div>


    </div>
  )
}

export default CreateTrip
