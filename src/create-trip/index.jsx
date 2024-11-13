<<<<<<< Updated upstream
import { AI_PROMPT, SelectBudgetOption, SelectTravelsList } from '@/constants/options';
import { chatSession } from '@/services/Almodal';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';

=======
import React from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
>>>>>>> Stashed changes

function CreateTrip() {
  const [place,setPlace]=useState();

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

  return (
    // <div className=' sm:px-10 md:px-32 lg:px-56 xl:px-10 mt-10'>

<div className="min-h-screen flex items-center justify-center bg-gray-100 p-16 font-poppins">
      <div className="w-full max-w-5xl bg-white p-16 rounded-xl shadow-xl border border-gray-200">
        <h2 className="text-5xl font-bold mb-8 text-center text-gray-800">
          Tell us your travel preferences <span role="img" aria-label="travel">🧳🌴</span>
        </h2>
        <p className="text-gray-600 mb-12 text-center text-2xl">
          Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
        </p>

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
        <div className="mb-10">
          <h2 className="block text-gray-700 font-semibold mb-4 text-2xl">How many days are you planning for your trip?</h2>
=======
        <div className="mb-4">
          <h2 className="block text-gray-700 font-semibold mb-2">What is destination of choice?</h2>
          <GooglePlacesAutocomplete apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}/>
          <select className="w-full px-4 py-2 border rounded-md">
            <option>Select...</option>
           
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">How many days are you planning your trip?</label>
>>>>>>> Stashed changes
          <input
            type="text"
            placeholder="Ex. 3"
            className="w-full px-6 py-5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition text-xl"
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
            ))}
          </div>
         </div>

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
            ))}
          </div>
         </div>

        {/* Generate Trip Button */}
        <div className="text-center mt-12">
          <button onClick={OnGenerateTrip} className="px-10 py-5 bg-indigo-600 text-white font-semibold text-2xl rounded-lg shadow-lg hover:bg-indigo-700 transition">
            Generate Trip
          </button>
        </div>
      </div>
    </div>

    // {/* </div> */}
  )
}

export default CreateTrip