import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice";

const DropDown = () => {
  const [toogleMenus, setToogleMenus] = useState(false);
  const {email, role} = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-full bg-white px-3 py-3 text-lg font-semibold text-gray-900  hover:bg-gray-50"
            onClick={() => setToogleMenus(!toogleMenus)}
          >
            <FaRegUserCircle />
          </button>
        </div>
        {toogleMenus && (
          <div
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            tabIndex={0}
          >
            <div className="py-1">
              <span className="text-gray-700 block px-4 py-2 text-sm border-b-2">
                {email}
              </span>
              {role ? <Link
                onClick={() => setToogleMenus(false)}
                to={`/dashboard/${role}`}
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-50"
              >
                Dashboard
              </Link> : <Link
                onClick={() => setToogleMenus(false)}
                to="/register"
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-50"
              >
                Profile Setting
              </Link>}
              <button
                onClick={() => dispatch(logoutUser())}
                type="button"
                className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDown;
