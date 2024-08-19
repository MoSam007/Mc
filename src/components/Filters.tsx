import React from 'react';

const Filters: React.FC = () => {
  return (
    <div className="flex mx-auto px-10 py-16 justify-between space-x-4 my-6">
      <select className="border p-2 rounded">
        <option value="">Rent</option>
        <option value="low">Low to High</option>
        <option value="high">High to Low</option>
      </select>
      <select className="border p-2 rounded">
        <option value="">Location</option>
        <option value="location1">Location 1</option>
        <option value="location2">Location 2</option>
      </select>
      <select className="border p-2 rounded">
        <option value="">Bedrooms</option>
        <option value="studio">Studio Apartment</option>
        <option value="bedsitter">Bedsitter</option>
        <option value="1bed">1 Bedroom</option>
        <option value="2bed">2 Bedrooms</option>
        <option value="3bed">3+ Bedrooms</option>
      </select>
    </div>
  );
};

export default Filters;
