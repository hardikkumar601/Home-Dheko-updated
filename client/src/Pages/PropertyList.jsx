import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPropertyList } from "../redux/state";
import Loader from "../components/Loader";
import axios from "axios";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

function PropertyList() {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state?.user?._id);
  const propertyList = useSelector(
    (state) => state?.user?.propertyList?.propertyList
  );
  const dispatch = useDispatch();
  const getPropertyList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/user/${userId}/properties`
      );
      const data = response.data;

      dispatch(setPropertyList({ propertyList: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Property List failed!", err.message);
    }
  };

  useEffect(() => {
    getPropertyList();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="text-3xl font-bold text-blue mt-3 ml-3">Your Property List</h1>
      <div className="list mt-3">
        {propertyList?.map(
          ({
            _id,
            creator,
            listingPhotoPaths,
            city,
            province,
            country,
            category,
            type,
            price,
            booking = false,
          }) => (
            <ListingCard
              listingId={_id}
              creator={creator}
              listingPhotoPaths={listingPhotoPaths}
              city={city}
              province={province}
              country={country}
              category={category}
              type={type}
              price={price}
              booking={booking}
            />
          )
        )}
      </div>
      <Footer />
    </>
  );
}

export default PropertyList;
