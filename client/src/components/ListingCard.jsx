import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setWishList } from "../redux/state";
import axios from "axios"

const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  province,
  country,
  category,
  type,
  price,
  startDate,
  endDate,
  totalPrice,
  booking,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const wishList = user?.wishList|| [];
  const isLiked = wishList?.find((item) => item?._id === listingId);
  const goToPrevSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? listingPhotoPaths.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === listingPhotoPaths.length - 1 ? 0 : prevIndex + 1
    );
  };

  const patchWishList = async () => {
    if (user?._id !== creator._id) {
      const response = await axios.patch(`http://localhost:3000/user/${user?._id}/${listingId}`);
      const data =  response.data;
      console.log(data);
      dispatch(setWishList(data.wishList));
    } else {
      return;
    }
  };

  return (
    <>
    <div className="flex">
    <div
      className="listing-card relative overflow-hidden rounded-lg shadow-lg cursor-pointer m-4 w-2/3 "
      onClick={() => navigate(`/properties/${listingId}`)}
    >
      <div className="slider-container w-medium">
        <div className="slider flex">
          {listingPhotoPaths?.map((photo, index) => (
            <div
              key={index}
              className={`slide ${index === currentIndex ? "block" : "hidden"}`}
            >
              <img
                src={`http://localhost:3000/${photo?.replace("public", "")}`}
                alt={`photo ${index + 1}`}
                className="w-40 h-40 px-2 py-2 mx-auto"
              />
            </div>
          ))}
          <button
            className="prev-button absolute top-1/2 left-4 transform -translate-y-1/2 text-white cursor-pointer"
            onClick={(e)=>goToPrevSlide(e)}
          >
            <img className="h-6 w-6" src="/ifgb/chevron.png" />
          </button>
          <button
            className="next-button absolute top-1/2 right-4 transform -translate-y-1/2 text-white cursor-pointer"
            onClick={(e)=>goToNextSlide(e)}
          >
            <img className="h-6 w-6" src="/ifgb/right.png" />
          </button>
        </div>
      </div>
      <h3 className="text-lg">{`${city}, ${province}, ${country}`}</h3>
      <p>{category}</p>
      {!booking ? (
        <>
          <p>{type}</p>
          <p className="font-semibold">${price} per night</p>
        </>
      ) : (
        <>
          <p>{`${startDate} - ${endDate}`}</p>
          <p className="font-semibold">${totalPrice} total</p>
        </>
      )}
      <button
        className="favorite absolute top-4 right-4 border-none bg-transparent cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
           patchWishList();
        }}
        disabled={!user}
      >
        {isLiked ? (
          <img className="h-6 w-6" src="/ifgb/like.png" />
        ) : (
          <img className="h-6 w-6" src="/ifgb/love.png" />
        )}
      </button>
    </div>
  </div>
  </>
  );
};

export default ListingCard;
