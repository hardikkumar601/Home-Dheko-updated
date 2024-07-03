import React from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme CSS file
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";

function ListingDetail() {
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  const getListDetail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/properties/${listingId}`
      );
      const data = response.data;
      setListing(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
    }
  };

  useEffect(() => {
    getListDetail();
  }, []);

  //  Booking calander
  const [selectionRange, setSelectionRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelectRanges = (ranges) => setSelectionRange([ranges.selection]);

  const start = new Date(selectionRange[0]?.startDate);
  const end = new Date(selectionRange[0]?.endDate);
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24);

  // submit Booking 
  const customerId = useSelector((state)=>state?.user?._id);
  const navigate = useNavigate();

  const handleSubmit = async()=>{
    const bookingForm = {
      customerId,
      listingId,
      hostId : listing.creator._id,
      startDate : selectionRange[0].startDate,
      endDate : selectionRange[0].endDate,
      totalPrice : listing.price * dayCount
    }
    try{
      if(customerId){
        const response = await  axios.post("http://localhost:3000/bookings/create",bookingForm);

        if(response.status === 200){
         navigate(`/${customerId}/trips`)
        }
      }else{
        navigate("/login")
      }
     
    }catch(err){
      console.log("Submit Booking Failed.", err.message)
    }
  }

  return loading ? (
    <Loader />
  ) : (
    <>
    <Navbar/>
    <div className="container mx-auto p-4">
      <div className="title mb-4">
        <h1 className="text-3xl font-bold">{listing.title}</h1>
      </div>
  
      <div className="photos grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {listing.listingPhotoPaths?.map((item, index) => (
          <img
            key={index}
             src={`http://localhost:3000/${item.replace("public", "")}`}
            alt="listing photo"
            className="rounded-lg w-40 h-40"
          />
        ))}
      </div>
  
      <h2 className="text-2xl font-semibold mb-2">
        {listing.type} in {listing.city}, {listing.province}, {listing.country}
      </h2>
      <hr className="my-4" />
  
      <div className="profile flex items-center mb-4">
        <img
           src={`http://localhost:3000/${listing.creator.profileImage.replace("public", "")}`}
          alt="host profile"
          className="rounded-full w-16 h-16 mr-4"
        />
        <h3 className="text-xl">
          Hosted by <b>{listing.creator.firstName || "ADITYA"} {listing.creator.lastName || "DUBEY"}</b>
        </h3>
      </div>
      <hr className="my-4" />
  
      <h3 className="text-xl font-semibold mb-2">Description</h3>
      <p className="mb-4">{listing.description}</p>
      <hr className="my-4" />
  
      <h3 className="text-xl font-semibold mb-2">{listing.highlight}</h3>
      {/* <p className="mb-4">{listing.highlightDesc}</p> */}
      <hr className="my-4" />
      <h2 className="text-2xl font-semibold">What this place offers?</h2>
      <div className="booking mb-3 lg:flex lg:justify-between "> 
        <div className="amenities grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {listing.amenities[0].split(",").map((item, index) => (
            <div className="facility flex items-center mb-2 " key={index}>
              <p className="text-xl hover:font-medium">{item}</p>
            </div>
          ))}
        </div>
        <div className="lg:ml-8 mt-0">
          <h2 className="text-2xl font-semibold mt-4 mb-2">How long do you want to stay?</h2>
          <div className="date-range-calendar ">
            <DateRange ranges={selectionRange} onChange={handleSelectRanges} />
            {dayCount > 1 ? (
              <h2 className="font-8xl font-bold">
                ${listing.price} x {dayCount} nights
              </h2>
            ) : (
              <h2  className="font-8xl font-bold" >
                ${listing.price} x {dayCount} night
              </h2>
            )}
  
            <h2 className="font-8xl font-bold">Total price: ${listing.price * dayCount}</h2>
            <p>Start Date: {selectionRange[0] ?.startDate ?.toDateString()}</p>
            <p>End Date: {selectionRange[0] ?.endDate ?.toDateString()}</p>
  
            <button className="w-1/2 px-4 py-2 bg-pinkred border-none font-semibold cursor-pointer transition duration-300 ease-in-out text-white rounded-md disabled:opacity-50" type="submit" onClick={handleSubmit}>
              BOOKING
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );  
}
export default ListingDetail;
