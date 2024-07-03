import React, { useEffect, useState } from "react";
import { categories } from "../../Data";
import axios from "axios";
import { setListing } from "../redux/state";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import ListingCard from "./ListingCard";

function Listing() {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listing?.listing);

  const getFeedListings = async () => {
    try {
      const response = await axios.get(
        selectedCategory !== "All"
          ? `http://localhost:3000/properties?category=${selectedCategory}`
          : "http://localhost:3000/properties"
      );

      const data = response.data;
      console.log(data);
      dispatch(
        setListing({
          listing: data,
        })
      );
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  };

  // call the function
  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);

  return (
    <>
      <div className="flex flex-wrap gap-6 mt-7 mx-5 justify-center">
        {categories?.map((category, index) => (
          <div
            key={index}
            className={`p-4 bg-gray-200 rounded-md shadow-md hover:bg-gray-300 transition-colors duration-300 cursor-pointer
          ${category.label === selectedCategory ? "border-pinkred " : ""}`}
            onClick={() => setSelectedCategory(category.label)}
          >
            {category.label}
          </div>
        ))}
      </div>
      {loading ? (
        <div>
          <Loader></Loader>
        </div>
      ) : (
        <div>
          {listings?.map(
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
            },index) => (
              <ListingCard
                key={index}
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
      )}
    </>
  );
}

export default Listing;
