import { useState } from "react";
import { MenuIcon } from "@heroicons/react/solid";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/state";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/properties/search/${search}`);
    }
  };

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link to="/" className="flex items-center py-4 px-2">
                <img src="/ifgb/logo.png" alt="Logo" className="h-10 w-auto" />
              </Link>
            </div>
          </div>

          <div className="flex w-80 my-3 mx-10 rounded-full border-2 border-gray-600 bg-transparent md:my-4">
            <input
              className="w-full border-none bg-transparent px-2 py-0.5 text-sm text-gray-400 outline-none focus:outline outline-offset-2 outline-2"
              type="search"
              name="search"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              disabled={search === ""}
              type="button"
              onClick={handleSearch}
              className="m-1 rounded bg-blue-600 px-2 py-1 text-xs text-white"
            >
              <img src="/ifgb/search.png" alt="search bar" className="h-6 w-6" />
            </button>
          </div>

          <div className="flex items-center m-5">
            <button
              className="flex border-4 rounded-lg"
              onClick={() => setIsOpen(!isOpen)}
            >
              <MenuIcon className="h-8 w-8 my-2 mr-2" />
              <div className="relative w-9 h-9 mt-1 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                {!user ? (
                  <img
                    src="/ifgb/user.png"
                    alt="user profile"
                    className="absolute object-cover w-full h-full rounded-full"
                  />
                ) : (
                  <img
                    src={`http://localhost:3000/${user.profileImage.replace(
                      "public",
                      ""
                    )}`}
                    alt="user profile"
                    className="absolute object-cover w-full h-full rounded-full"
                  />
                )}
              </div>
            </button>
          </div>
        </div>

        {isOpen && !user && (
          <div className="mobile-menu">
            <Link to="/login" className="block py-2 px-4 text-sm hover:bg-gray-200">
              LogIn
            </Link>
            <Link to="/register" className="block py-2 px-4 text-sm hover:bg-gray-200">
              SignIn
            </Link>
          </div>
        )}

        {user && isOpen && (
          <div className="mobile-menu">
            <Link to={`/${user._id}/trips`} className="block py-2 px-4 text-sm hover:bg-gray-200">
              Trip List
            </Link>
            <Link to={`/${user._id}/wishList`} className="block py-2 px-4 text-sm hover:bg-gray-200">
              Wish List
            </Link>
            <Link to={`/${user._id}/properties`} className="block py-2 px-4 text-sm hover:bg-gray-200">
              Property List
            </Link>
            <Link to={`/${user._id}/reservations`} className="block py-2 px-4 text-sm hover:bg-gray-200">
              Reservation List
            </Link>
            <Link to="/create-listing" className="block py-2 px-4 text-sm hover:bg-gray-200">
              Become A Host
            </Link>
            <Link
              to="/login"
              className="block py-2 px-4 text-sm hover:bg-gray-200"
              onClick={() => {
                dispatch(setLogout());
              }}
            >
              SignOut
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
