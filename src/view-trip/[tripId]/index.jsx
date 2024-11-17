import Information from "../../components/components/Information";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/fireBaseConfig";
import Hotels from "../../components/components/Hotels";
import PlacesToVisit from "@/components/components/PlacesToVisit";
function ViewTrip() {
const [trip, setTrip] = useState(null);
const { tripId } = useParams();

const GetTripData = async () => {
    try {
        const docRef = doc(db, "AiTrips", tripId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            const data = docSnap.data();
            setTrip(data);
        }
    } catch (error) {
        // Handle error silently or add error state if needed
    }
}

useEffect(() => {
    GetTripData();
}, [tripId]);

return(
    <>
        <div className="p-10 md:px-20 lg:px-44 xl:px-56">
            <Information trip={trip} />
            <Hotels trip={trip} />
            <PlacesToVisit trip={trip} />
        </div>
    </>
)
}
export default ViewTrip;