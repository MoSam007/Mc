import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image1 from '../images/alexander-andrews-A3DPhhAL6Zg-unsplash.jpg';

interface Listing {
  id: number;
  title: string;
  description: string;
  location: string;
  price: string;
  rating: number;
  imageUrl: string;
}

const listings: Listing[] = [
  // Sample listings
  {
    id: 1,
    title: 'MiCasa Appartments',
    location: 'Nairobi, Kenya',
    price: 'KSh 12,546 per month',
    rating: 5.0,
    imageUrl: image1,
    description: 'Sweet home'
  },
  // Add more listings here
];

const Listings: React.FC = () => {
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState<number[]>([]);

  const handleClick = (id: number) => {
    navigate(`/listing/${id}`);
  };

  const toggleWatchlist = (id: number) => {
    const updatedWatchlist = watchlist.includes(id)
      ? watchlist.filter(item => item !== id)
      : [...watchlist, id];

    setWatchlist(updatedWatchlist);

    if (updatedWatchlist.includes(id)) {
      alert('Listing added to watchlist');
    } else {
      alert('Listing removed from watchlist');
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="relative border rounded-lg overflow-hidden shadow-md cursor-pointer"
            onClick={() => handleClick(listing.id)}
          >
            <img
              src={listing.imageUrl}
              alt={listing.title}
              className="w-full h-48 object-cover"
              style={{ height: '300px', width: '100%', objectFit: 'cover' }}
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">{listing.title}</h2>
              <p className="text-gray-600">{listing.location}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-primary font-bold">{listing.price}</span>
                <span className="text-gray-600">⭐ {listing.rating}</span>
              </div>
            </div>
            <button
              className={`absolute top-2 right-2 text-white rounded-full p-2 transition duration-300 ${
                watchlist.includes(listing.id)
                  ? 'bg-yellow-500'
                  : 'bg-gray-600 hover:bg-yellow-500'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                toggleWatchlist(listing.id);
              }}
            >
              ❤
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listings;
