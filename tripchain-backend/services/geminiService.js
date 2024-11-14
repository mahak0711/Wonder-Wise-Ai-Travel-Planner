import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateTripItinerary({ location, days, budget, travelCompanions }) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Generate a detailed ${days}-day trip itinerary for ${travelCompanions} people visiting ${location} with a budget of $${budget}. 
    Include daily activities, recommended restaurants, and accommodations. 
    Format the response as a structured itinerary with times and estimated costs.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  // Parse the text response into structured data
  // This is a simple example - you might want to make this more sophisticated
  const itinerary = text.split('Day').slice(1).map((day, index) => {
    return {
      day: index + 1,
      activities: day.split('\n')
        .filter(line => line.trim())
        .map(line => line.trim())
    };
  });

  return itinerary;
}
