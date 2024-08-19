import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface IListing {
  _id: string;
  title: string;
  location: string;
  price: string;
  rating: number;
  imageUrls: string[];
  description: string;
  amenities: string[];
}

const ListingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<IListing | null>(null);

  useEffect(() => {
    fetch(`http://locdalhost:5000/api/listings/${id}`)
      .then((response) => response.json())
      .then((data) => setListing(data))
      .catch((error) => console.error('Error fetching listing:', error));
  }, [id]);

  if (!listing) {
    return <div>Listing not found</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          {/* Ensure imageUrls exists before mapping */}
          {listing.imageUrls && listing.imageUrls.length > 0 ? (
            listing.imageUrls.map((url, index) => (
              <img 
                key={index} 
                src={`http://localhost:5000/${url}`} 
                alt={listing.title} 
                className="w-full h-80 object-cover rounded-lg mb-4" 
              />
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>
        <div className="md:ml-6 mt-4 md:mt-0">
          <h1 className="text-2xl font-semibold">{listing.title}</h1>
          <p className="text-gray-600 mt-2">{listing.location}</p>
          <p className="text-gray-800 mt-4">Price: {listing.price}</p>
          <p className="text-gray-800 mt-4">Rating:  {listing.rating}⭐</p>
          <p className="text-gray-800 mt-4">Description: {listing.description}</p>
          <ul className="text-gray-600 mt-4">
            {/* Ensure amenities exists before mapping */}
            {listing.amenities && listing.amenities.length > 0 ? (
              listing.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))
            ) : (
              <p>No amenities listed</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
