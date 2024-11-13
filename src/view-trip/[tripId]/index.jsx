import Information from "@/components/components/Information";
import React, { useEffect } from "react";

function ViewTrip() {
const { tripId } = useParams();
const [trip, setTrip] = useState([]);

useEffect(() => {
   tripId&&GetTripData();
}, [tripId]);

const  GetTripData = async () => {
    const docRef = doc(db, "AItrips", tripId);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
        setTrip(docSnap.data());
        return docSnap.data();
    }else{
        return null;
    }
}
return(
    <>
            <div className="p-10 md:px-20 lg:px-44 xl:px-56">

    <Information trip={trip} />
    <Hotels trip={trip} />

    </div>
    </>
)
}
export default ViewTrip;