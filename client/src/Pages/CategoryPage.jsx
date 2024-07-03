import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setListing } from "../redux/state";
import Loader from "../components/Loader";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer"
import axios from "axios"

function CategoryPage() {
  const [loading, setLoading] = useState(true);
  const { category } = useParams();
  const dispatch = useDispatch();
  const listings = useSelector((state) => state?.listing?.listings);
  console.log(listings)
  const getFeedListing = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/properties?category=${category}`
      );

      const data =  response.data;
      console.log(data);
      dispatch(setListing({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  };

  useEffect(() => {
    getFeedListing();
  }, [category]);
  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="text-3xl font-bold text-blue mt-3 ml-3"> {category} home</h1>
      <div className="list">
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
              key = {index}
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

export default CategoryPage;
