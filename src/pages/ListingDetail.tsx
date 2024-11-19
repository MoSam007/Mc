import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FaBed, FaChair, FaBiking, FaDumbbell, FaChild,
  FaBuilding, FaSwimmer, FaFire, FaCar,
  FaHandsWash, FaTree, FaShower,FaToilet, FaShoppingCart,
  FaHospital, FaWater, FaCarSide, FaWineGlass, FaUmbrella, FaHeart
} from 'react-icons/fa';

interface IListing {
  images: any;
  l_id: number;
  title: string;
  location: string;
  price: string;
  rating: number;
  imageUrls: string[];
  description: string;
  amenities: string[];
  likes: number;
}


const iconMapping: { [key: string]: JSX.Element } = {
  bedroom: <FaBed />,
  bed: <FaBed />,
  bath: <FaToilet/>,
  shower: <FaShower/>,
  patio: <FaUmbrella />,
  balcony: <FaBiking />,
  gym: <FaDumbbell />,
  playground: <FaChild />,
  mart: <FaShoppingCart/>,
  chemist: <FaHospital/>,
  water: <FaWater/>,
  kids: <FaChild />,
  elevator: <FaBuilding />,
  lift: <FaBuilding />,
  pool: <FaSwimmer />,
  fireplace: <FaFire />,
  firepit: <FaFire/>,
  parking: <FaCar />,
  car: <FaCarSide />,
  kitchen: <FaWineGlass/>,
  laundry: <FaHandsWash />,
  garden: <FaTree />,
};

const ListingDetail: React.FC = () => {
  const { l_id } = useParams<{ l_id: string }>();
  const [listing, setListing] = useState<IListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/listings/${l_id}`);
        if (!response.ok) {
          throw new Error('Error fetching listing');
        }
        const data = await response.json();
        setListing(data);
      } catch (err) {
        setError('Failed to load listing.');
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [l_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!listing) return <div>Listing not found</div>;

  const backendUrl = "http://localhost:5000";

  // Function to find the matching icon based on keywords
  const getAmenityIcon = (amenity: string) => {
    const amenityLower = amenity.toLowerCase();
    for (const keyword in iconMapping) {
      if (amenityLower.includes(keyword)) {
        return iconMapping[keyword];
      }
    }
    // Default icon if no keyword matches
    return <FaChair />;
  };

  const handleLike = async () => {
    if (!loggedIn) {
      alert('Please log in to like this listing.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/listings/${l_id}/like`, {
        method: 'POST',
      });
      if (response.ok && listing) {
        setListing({ ...listing, likes: listing.likes + 1 });
      }
    } catch (error) {
      console.error('Error liking listing:', error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Photo Gallery Section */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {/* Main Large Image */}
        {listing.imageUrls?.[0] && (
          <img
            src={`${backendUrl}/uploads/${listing.imageUrls[0]}`}
            alt="Main Im"
            className="col-span-1 w-full h-96 object-cover rounded-lg shadow-md"
          />
        )}
        {/* Thumbnails */}
        <div className="grid grid-cols-2 gap-2">
          {listing.imageUrls.slice(1, 5).map((url, index) => (
            <img
              key={index}
              src={`${backendUrl}/uploads/${url}`}
              alt={`Thumbnail ${index + 2}`}
              className="w-full h-44 object-cover rounded-lg shadow-md"
            />
          ))}
          {listing.imageUrls.length > 5 && (
            <Link to={`/listing/${l_id}/gallery`} className="col-span-2 text-center text-blue-500 mt-2">
              View All Photos
            </Link>
          )}
        </div>
      </div>

      {/* Description and Details */}
      <div>
      <div className="flex items-center mb-4">
            <FaHeart className="text-red-500 mr-2" />
            <span>{listing?.likes || 0} likes</span>
          </div>
        <h1 className="text-2xl font-semibold">{listing.title}</h1>
        <p className="text-gray-600 mt-2"><strong>Location:</strong> {listing.location}</p>
        <p className="text-gray-800 mt-4"><strong>Price:</strong> {listing.price}</p>
        <p className="text-gray-800 mt-4"><strong>Rating:</strong> {listing.rating}⭐</p>
        <p className="text-gray-800 mt-4"><strong>Description:</strong> {listing.description}</p>
      </div>

      {/* Amenities Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900">Amenities</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {listing.amenities.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-blue-900">{getAmenityIcon(amenity)}</span>
              <span className="text-gray-700 capitalize">{amenity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
