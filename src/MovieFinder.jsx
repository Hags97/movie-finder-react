import { useState } from "react";

export const MovieFinder = () => 
{
    const urlBase = 'https://api.themoviedb.org/3/search/movie';
    const API_KEY = '*********************************';

    const [movie, setMovie] = useState('');
    const [infoMovie, setInfoMovie] = useState([]);

    const handleInput = (e) => {
        setMovie(e.target.value);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        fetchMovies();

    }

    const fetchMovies = async () => {
        try{
            const response = await fetch(`${urlBase}?query=${movie}&api_key=${API_KEY}`);
            const data = await response.json();
            setInfoMovie(data.results);
        }
        catch(error)
        {
            console.log('Se produjo un fuckin: ' +  error)
        }
}

    return (
        <div className='container'>

            <h1 className='title'>Movie Finder</h1>
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
      
                value={movie}
                onChange={handleInput}
                />

                <button type='submit' className='search-button'>Find</button>
            </form>

            <div className="movie-list">
                {
                infoMovie.map((movie) => (
                    <div key={movie.id} className="movie-card">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        <h2>{movie.title}</h2>
                        <p>{movie.overview}</p>
                    </div>
                ))}

            </div>
        </div>
    )
}
