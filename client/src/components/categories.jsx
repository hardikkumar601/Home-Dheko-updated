import React from "react";
import { categories } from "../../Data";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Explore Top Categories
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Explore our wide range of vacation rentals that cater to all types of
        travelers. Immerse yourself in the local culture, enjoy the comforts of
        home, and create unforgettable memories in your dream destination.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories?.slice(1, 7).map((category, index) => (
          <Link to={`/properties/category/${category.label}`} key={index} className="relative">
            <img
              src={category.img}
              alt={category.label}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-white font-semibold">{category.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
