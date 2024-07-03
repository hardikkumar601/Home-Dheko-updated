import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../redux/state";
import Loader from "../components/Loader";
import axios from "axios";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

function TripList() {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state?.user?._id);
  const tripList = useSelector((state) => state?.user?.tripList?.tripList);
  const dispatch = useDispatch();
  const getTripList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/user/${userId}/trips`
      );
      const data = response.data;

      dispatch(setTripList({ tripList: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Trip List failed!", err.message);
    }
  };

  useEffect(() => {
    getTripList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="text-3xl font-bold text-blue mt-3 ml-3">Your Trip List</h1>
      <div className="list mt-3">
        {tripList?.map(
          ({
            listingId,
            hostId,
            startDate,
            endDate,
            totalPrice,
            booking = true,
          }) => (
            <ListingCard
              listingId={listingId._id}
              creator={hostId._id}
              listingPhotoPaths={listingId.listingPhotoPaths}
              city={listingId.city}
              province={listingId.province}
              country={listingId.country}
              category={listingId.category}
              startDate={startDate}
              endDate={endDate}
              totalPrice={totalPrice}
              booking={booking}
            />
          )
        )}
      </div>
      <Footer/>
    </>
  );
}

export default TripList;
