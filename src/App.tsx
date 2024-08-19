// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Navigation';
import Footer from './components/Footer';
import Listings from './pages/listings';
import ListingDetail from './pages/listingDetail';
import Filters from './components/Filters';
import AddListingForm from './pages/AddListingForm';
import Contacts from './pages/Contacts';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Filters />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Listings />} />
            <Route path="/listing/:id" element={<ListingDetail />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/add-listing" Component={AddListingForm} />
          </Routes>
        </main>
        <AddListingForm />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
