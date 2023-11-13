import React, { useState } from 'react';
import '../css/Address.css';

const AddressInput = () => {
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [message, setMessage] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setCoordinates({ lat, lng });
        }
        else {
          // Handle no results found
          console.error('No results found for the address:', address);
          setMessage('Address Not found')
        }
      } else {
        // Handle error response from API
        console.error('Error fetching coordinates:', response.status);
        setMessage('Error fetching coordinates. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      setMessage('Error fetching coordinates. Please try again.');
    }
  };
  


  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter an address"
        />
        <button type="submit">
          Get Coordinates
        </button>
      </form>
      {message && <p>{message}</p>} 
      {coordinates && (
        <div>
          <h2>Coordinates</h2>
          <p>Latitude: {coordinates.lat}</p>
          <p>Longitude: {coordinates.lng}</p>
        </div>
      )}
      
    </div>
    
  );
};

export default AddressInput;
