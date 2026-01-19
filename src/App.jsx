import React from 'react'
import Search from './components/Search.jsx';
import { useEffect,useState } from 'react';
import Spinner from './components/Spinner.jsx';

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
// talvez de erro por ser .enc.local, ver dps??

const API_OPTIONS = {
  methord: 'GET',
  headers: {
    accept:'application/JSON',
    Authorization: `bearer ${API_KEY}`,
  }
}

const App = () => {

const [searchTerm,setSearchTerm] = useState('');
const [errorMessage, setErrorMessage] = useState('');
const [movieList, setMovieList]= useState([]);
const [isLoading,setIsLoading] = useState(false);

const fetchMovies = async () => {
  setIsLoading(true);
  setErrorMessage('');

  try {
    const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch (endpoint, API_OPTIONS);

    if(!response){
    throw new Error('Failed to fetch movies');
    }

    const data = await response.json();

    if(data.Response === 'Failed'){
      setErrorMessage(data.Error || 'Failed to fetch movies');
      setMovieList([]);
      return
    }

    setMovieList(data.results || []);

  } catch (error) {
    console.error(`Error fetching movies: ${error}`);
    setErrorMessage('Error fetching movies. Please try again later.');

  } finally {
    setIsLoading(false);
  }
}

useEffect( () => {
  fetchMovies();
  }, [])
  
return (
  <main>
    <div className="pattern" />

    <div className="wrapper">
      <header>
        <img src="./hero.png" alt="Hero Banner" />
        <h1>Find <span className="text-gradient">Movies</span>  You Will Enjoy</h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />   
      </header>
      <section className="all-movies">
        <h2 className="mt-[40px]">All Movies</h2>

        {isLoading ? 
          <Spinner /> : errorMessage ? <p className="text-red-500"> {errorMessage}</p> : <ul>
            {movieList.map((movie) => ( <p key={movie.id} className="text-white">{movie.title}</p>)
            )}
          </ul>
        }

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </section>       
    </div>     
  </main>
);
}
 
export default App;