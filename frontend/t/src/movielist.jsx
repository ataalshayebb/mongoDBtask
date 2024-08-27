import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching movies...');
    axios.get('http://localhost:3000/api/movies')
      .then(response => {
        console.log('Received response:', response);
        if (response.data && Array.isArray(response.data)) {
          console.log('Number of movies received:', response.data.length);
          setMovies(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
          setError('Unexpected data format received from server');
        }
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
        if (error.response) {
          console.error('Error response:', error.response.data);
          console.error('Error status:', error.response.status);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
        setError('Failed to fetch movies');
      });
  }, []);

  useEffect(() => {
    console.log('Current movies state:', movies);
  }, [movies]);

  const handleImageError = (e, movieTitle) => {
    e.target.onerror = null; // Prevents infinite loop if fallback also fails
    e.target.src = `https://placehold.co/200x300?text=${encodeURIComponent(movieTitle)}`;
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Movies List</h1>
      <p>Total movies: {movies.length}</p>
      {movies.length === 0 ? (
        <p>Loading movies...</p>
      ) : (
        <ul>
          {movies.slice(0, 3).map(movie => (
            <li key={movie._id}>
              <h2>{movie.title || 'No Title'}</h2>
              <p><strong>Plot:</strong> {movie.plot || 'No plot available'}</p>
              <p><strong>Genres:</strong> {movie.genres && movie.genres.length > 0 ? movie.genres.join(', ') : 'N/A'}</p>
              <p><strong>Runtime:</strong> {movie.runtime || 'N/A'} minutes</p>
              <p><strong>Cast:</strong> {movie.cast && movie.cast.length > 0 ? movie.cast.join(', ') : 'N/A'}</p>
              {movie.poster && (
                <img 
                  src={movie.poster} 
                  alt={movie.title} 
                  style={{ width: '200px' }} 
                  onError={(e) => handleImageError(e, movie.title)}
                />
              )}
              <p><strong>Full Plot:</strong> {movie.fullplot || 'No full plot available'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MoviesList;