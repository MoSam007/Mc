import React from 'react';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Navigation';
import Footer from './components/Footer';
import Listings from './pages/Listings';
import ListingDetail from './pages/ListingDetail';
import Filters from './components/Filters';
import AddListingForm from './pages/AddListingForm';
import Contacts from './pages/Contact';
import Gallery from './pages/Gallery';
import AdminListingManager from './pages/AdminListingManager';
import AdminListingDetail from './pages/AdminListingDetail';
import UpdateListingForm from './components/UpdateListingForm';
import { useState, useEffect } from 'react';
import { IListing } from './types';
import Login from './pages/Login';

const App: React.FC = () => {
  const [listings, setListings] = useState<IListing[]>([]);

  // Fetch all listings on load (or update if you modify listings elsewhere)
  useEffect(() => {
    async function fetchListings() {
      const response = await fetch('http://localhost:5000/api/listings');
      const data = await response.json();
      setListings(data);
    }
    fetchListings();
  }, []);

  const handleUpdateListing = (updatedListing: IListing) => {
    setListings(prevListings =>
      prevListings.map(listing =>
        listing.l_id === updatedListing.l_id ? updatedListing : listing
      )
    );
  };

  const UpdateListingWrapper = () => {
    const { l_id } = useParams<{ l_id: string }>();
    const listing = listings.find(listing => listing.l_id === Number(l_id));

    if (!listing) return <p>Loading...</p>;

    return <UpdateListingForm listing={listing} onUpdate={handleUpdateListing} />;
  };
  
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Filters />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Listings />} />
            <Route path="/listing/:l_id" element={<ListingDetail />} />
            <Route path="/listing/:l_id/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contacts />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/add-listing" element={<AddListingForm />} />
            <Route path="/admin/listings" element={<AdminListingManager />} />
            <Route path="/admin/listings/:l_id" element={<AdminListingDetail />} />
            <Route path="/admin/listings/:l_id/update" element={<UpdateListingWrapper />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
