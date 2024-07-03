import React from "react";
import { useState } from "react";
import { categories, types, facilities } from "../../Data";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

function CreateListing() {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  const [amenities, setAmenities] = useState([]);

  const handleSelectAmenities = (facility) => {
    if (amenities?.includes(facility)) {
      setAmenities((prevAmenities) => {
        return prevAmenities.filter((option) => {
          return option !== facility;
        });
      });
    } else {
      setAmenities((prev) => [...prev, facility]);
    }
  };

  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    province: "",
    country: "",
  });

  const handleChangeLocation = (event) => {
    const { name, value } = event.target;
    setFormLocation({
      ...formLocation,
      [name]: value,
    });
  };

  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    price: 0,
  });

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({
      ...formDescription,
      [name]: value,
    });
  };

  const [myHomePhotos, setMyHomePhotos] = useState([]);

  const handleUploadPhoto = (e) => {
    const { files } = e.target;
    setMyHomePhotos((prevPhotos) => [...prevPhotos, files[0]]);
    console.log(myHomePhotos);
  };

  const Navigate = useNavigate();
  const creatorId = useSelector((state) => state.user?._id);
  const token = useSelector((state)=>state.token);

  const handlePost = async (event) => {
    event.preventDefault();

    try {
      const listingForm = new FormData();
      listingForm.append("creator", creatorId);
      listingForm.append("category", category);
      listingForm.append("type", type);
      listingForm.append("streetAddress", formLocation.streetAddress);
      listingForm.append("aptSuite", formLocation.aptSuite);
      listingForm.append("city", formLocation.city);
      listingForm.append("province", formLocation.province);
      listingForm.append("country", formLocation.country);
      listingForm.append("amenities", JSON.stringify(amenities));
      listingForm.append("title", formDescription.title);
      listingForm.append("description", formDescription.description);
      listingForm.append("highlight", formDescription.highlight);
      listingForm.append("price", formDescription.price);

      myHomePhotos.forEach((myHomePhoto) => {
        listingForm.append("myHomePhotos", myHomePhoto);
      });

      //   for (let pair of listingForm.entries()) {
      //     console.log(pair[0]+ ', '+ pair[1]);
      //  }
      console.log(token);
      console.log(creatorId);
      const response = await axios.post(
        "http://localhost:3000/properties/create",
        listingForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        Navigate("/");
      }
    } catch (err) {
      console.log("Publish Listing failed", err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-10 bg-lightgrey">
        <h1 className="text-blue text-2xl font-semibold mb-4">
          Publish Your Place
        </h1>
        <form onSubmit={handlePost}>
          <div className="bg-white p-8 rounded-lg mt-4">
            <h2 className="text-pinkred text-xl font-semibold mb-2">
              Step 1: Tell us about your place
            </h2>
            <hr className="border-gray-200 my-4" />
            <h3 className="text-blue text-lg font-semibold mb-2">
              Which of these categories best describes your place?
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-4 px-8">
              {categories.slice(1,15).map((item, index) => (
                <div
                  className={`flex flex-col items-center justify-center w-24 h-20 border border-gray-400 rounded-md cursor-pointer transition-colors duration-200 ${
                    category === item.label
                      ? "border-pinkred  bg-lightgrey"
                      : ""
                  }`}
                  key={index}
                  onClick={() => setCategory(item.label)}
                >
                  <p className="font-semibold text-sm">{item.label}</p>
                </div>
              ))}
            </div>

            <h3 className="text-blue text-lg font-semibold mt-8 mb-2">
              What type of place will guests have?
            </h3>
            <div className="flex flex-col gap-4">
              {types.map((item, index) => (
                <div
                  className={`flex justify-between items-center max-w-md p-4 border border-gray-400 rounded-md cursor-pointer transition-colors duration-200 ${
                    type === item.name ? "border-pinkred bg-lightgrey" : ""
                  }`}
                  key={index}
                  onClick={() => setType(item.name)}
                >
                  <div className="max-w-xs">
                    <h4 className="font-semibold mb-1">{item.name}</h4>
                    <p className="text-sm">Description of {item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-blue text-lg font-semibold mt-8 mb-2">
              Where's your place located?
            </h3>
            <div className="max-w-2xl">
              <div className="mb-4">
                <p className="font-semibold mb-2">Street Address</p>
                <input
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  value={formLocation.streetAddress}
                  onChange={handleChangeLocation}
                  required
                  className="w-full p-4 border border-gray-400 rounded-md text-sm font-semibold"
                />
              </div>
            </div>

            <div className="max-w-2xl grid grid-cols-2 gap-8">
              <div className="mb-4">
                <p className="font-semibold mb-2">
                  Apartment, Suite, etc. (if applicable)
                </p>
                <input
                  type="text"
                  placeholder="Apt, Suite, etc. (if applicable)"
                  name="aptSuite"
                  value={formLocation.aptSuite}
                  onChange={handleChangeLocation}
                  required
                  className="w-full p-4 border border-gray-400 rounded-md text-sm font-semibold"
                />
              </div>
              <div className="mb-4">
                <p className="font-semibold mb-2">City</p>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formLocation.city}
                  onChange={handleChangeLocation}
                  required
                  className="w-full p-4 border border-gray-400 rounded-md text-sm font-semibold"
                />
              </div>
            </div>

            <div className="max-w-2xl grid grid-cols-2 gap-8">
              <div className="mb-4">
                <p className="font-semibold mb-2">Province</p>
                <input
                  type="text"
                  placeholder="Province"
                  name="province"
                  value={formLocation.province}
                  onChange={handleChangeLocation}
                  required
                  className="w-full p-4 border border-gray-400 rounded-md text-sm font-semibold"
                />
              </div>
              <div className="mb-4">
                <p className="font-semibold mb-2">Country</p>
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={formLocation.country}
                  onChange={handleChangeLocation}
                  required
                  className="w-full p-4 border border-gray-400 rounded-md text-sm font-semibold"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg mt-4">
            <h2 className="text-pinkred text-xl font-semibold mb-2">
              Step 2: Make your place stand out
            </h2>
            <hr className="border-gray-200 my-4" />
            <h3 className="text-blue text-lg font-semibold mb-2">
              Tell guests what your place has to offer
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-4 px-8">
              {facilities.map((item, index) => (
                <div
                  className={`facility w-24 h-20 border border-gray-400 rounded-md cursor-pointer transition-colors duration-200 ${
                    amenities?.includes(item.name)
                      ? "border-pinkred bg-lightgrey "
                      : ""
                  }`}
                  key={index}
                  onClick={() => handleSelectAmenities(item.name)}
                >
                  <p className="font-semibold text-sm">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
          <h3 className="text-blue text-lg font-semibold mb-4">
            Add some photos of your place
          </h3>
          <div className="flex justify-center items-center h-40 w-40 border-dashed border-2 border-gray-400 cursor-pointer ">
            <input
              className="hidden"
              type="file"
              label="image/*"
              name="myHomePhotos"
              id="file-upload"
              accept=".jpeg, .png, .jpg"
              onChange={handleUploadPhoto}
            />
            <label
              htmlFor="file-upload"
              className="flex flex-col justify-center items-center h-30 w-30"
            >
              <img
                src="../ifgb/image-gallery.png"
                alt="upload photos"
                name="home-photo"
                className="h-10 w-10 m-3"
              />
              <p className="ml-2">upload photo from your device</p>
            </label>
          </div>
          {myHomePhotos?.map((photo, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
            >
              <p>{/* Placeholder text */}</p>
              <img
                src={URL.createObjectURL(photo)}
                alt={`Selected Photo ${index + 1}`}
                className="h-40 w-40"
              />
            </div>
          ))}
          <div className="description">
            <p className="mt-6">Title</p>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={formDescription.title}
              onChange={handleChangeDescription}
              required
            />
            <p className="mt-6">Description</p>
            <textarea
              type="text"
              placeholder="Description"
              name="description"
              value={formDescription.description}
              onChange={handleChangeDescription}
              required
            />
            <p className="mt-6">Highlight</p>
            <input
              type="text"
              placeholder="Highlight"
              name="highlight"
              value={formDescription.highlight}
              onChange={handleChangeDescription}
              required
            />
            <p className="mt-6">Now, set your PRICE</p>
            <span>$</span>
            <input
              type="number"
              placeholder="100"
              name="price"
              className="border-solid border-2 border-sky-500"
              value={formDescription.price}
              onChange={handleChangeDescription}
              required
            />
            <button className="w-1/2 px-4 py-2 bg-pinkred border-none font-semibold cursor-pointer transition duration-300 ease-in-out text-white rounded-md disabled:opacity-50" type="submit" >
              CREATE YOUR LISTING
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default CreateListing;
