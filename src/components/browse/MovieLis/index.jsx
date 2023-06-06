import React, { useState, useEffect } from 'react';
import movieTrailer from 'movie-trailer';
import instance from '../../../api/axios';
import MovieDetail from '../MovieDetail';

import './MovieList.css';

const base_url = 'https://image.tmdb.org/t/p/w500';
const movies_limit = 10;

function MovieList({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const request = await instance.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);


    const handlePoster = (movie) => {
        if (selectedMovie && selectedMovie.id === movie.id) {
            setSelectedMovie(null);
            setTrailerUrl('');
        } else {
            setSelectedMovie(movie);
            movieTrailer(movie?.name || movie?.title || movie?.original_title || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                })
                .catch((error) => console.log(error));
        }
    };

    movies.sort((a, b) => b.popularity - a.popularity);
    movies.splice(movies_limit);

    return (
        <div className='row'>
            <h2 className="movie-list-title">{title}</h2>
            <div className='row_posters sc2'>
                {movies.map((movie) => {
                    return (
                        <img
                            key={movie.id}
                            onClick={() => handlePoster(movie)}
                            className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
                            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name}
                        />
                    );
                })}
            </div>
            <div style={{ padding: '40px' }}>
                {selectedMovie && <MovieDetail movieData={selectedMovie} movieTrailer={trailerUrl} />}
            </div>
        </div>
    );
}

export default MovieList;