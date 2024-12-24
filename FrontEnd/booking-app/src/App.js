import React from 'react';
import BookingForm from './BookingForm';
import BookingList from './BookingList';
import ImageCarousel from './ImageCarousel';
import './App.css'; // Ensure this imports your updated App styles
import BSNavbar from './BSNavbar';

const App = () => (
  <div>
    {/* Navbar remains outside the App-container if it's a full-width element */}
    {/* <Navbar /> */}
    <BSNavbar />
    {/* Main content wrapped inside App-container for layout styling */}
    <div className="App-container">
    
      <ImageCarousel />
      <BookingForm />
      <BookingList />
    </div>
  </div>
);

export default App;
