import React, { useState } from 'react';
import { FaMapMarkerAlt, FaBed, FaDollarSign, FaSearch } from 'react-icons/fa';
import Autocomplete from 'react-google-autocomplete'; // Google Places Autocomplete

const Filters: React.FC = () => {
  const [location, setLocation] = useState<string>('');

  const handlePlaceSelected = (place: any) => {
    if (place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      console.log('Selected Place Lat:', lat);
      console.log('Selected Place Lng:', lng);
      setLocation(place.formatted_address);
    }
  };

  return (
    <div className="w-auto flex flex-col mx-auto items-center px-10 py-28 space-y-6 bg-white shadow-sm rounded-lg">
      
      {/* Google Places Autocomplete Search Bar */}
      <div className="flex items-center justify-between w-full max-w-4xl bg-gray-100 rounded-full p-3 shadow-sm space-y-2 ">
        <Autocomplete
          apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} // Replace with your Google API key
          onPlaceSelected={handlePlaceSelected}
          types={['(cities)']}
          className="flex-grow bg-transparent focus:outline-none text-gray-700 px-4"
          placeholder="Where are you going?"
        />
        <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full">
          <FaSearch className="h-5 w-5" />
        </button>
      </div>

      {/* Filter Section */}
      <div className="flex flex-wrap justify-between items-center space-y-4 md:space-y-0 space-x-0 md:space-x-6 bg-white py-2 px-6 shadow-lg rounded-md">
        
        {/* Rent Filter */}
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <FaDollarSign className="text-gray-500" />
          <select className="border-0 bg-transparent focus:outline-none text-gray-700 cursor-pointer w-full md:w-auto">
            <option value="">Rent</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>

        {/* Location Filter */}
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <FaMapMarkerAlt className="text-gray-500" />
          <select className="border-0 bg-transparent focus:outline-none text-gray-700 cursor-pointer w-full md:w-auto">
            <option value="">Location</option>
            <option value="location1">Location 1</option>
            <option value="location2">Location 2</option>
          </select>
        </div>

        {/* Bedrooms Filter */}
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <FaBed className="text-gray-500" />
          <select className="border-0 bg-transparent focus:outline-none text-gray-700 cursor-pointer w-full md:w-auto">
            <option value="">Bedrooms</option>
            <option value="studio">Studio Apartment</option>
            <option value="bedsitter">Bedsitter</option>
            <option value="1bed">1 Bedroom</option>
            <option value="2bed">2 Bedrooms</option>
            <option value="3bed">3+ Bedrooms</option>
          </select>
        </div>

        {/* Filters Button */}
        <button className="flex items-center w-full md:w-auto px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 012 0v.75M3 8.5a1 1 0 012 0v.75M3 13a1 1 0 012 0v.75M7 4h12m-12 4.5h12m-12 4.5h12m-12 4.5h12M3 17.5a1 1 0 012 0v.75" />
          </svg>
          <span className="ml-2">Filters</span>
        </button>
      </div>
    </div>
  );
};

export default Filters;
