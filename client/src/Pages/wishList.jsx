import React from "react";
import {  useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const WishList = () => {
    const wishList = useSelector((state) => state.user?.wishList);
    return (
      <>
        <Navbar />
        <h1 className="text-3xl font-bold text-blue mt-3 ml-3">Your Wish List</h1>
        <div className="list">
          {wishList?.map(
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
  };
  export default WishList;