import React, { useState, useEffect } from 'react';
import movieTrailer from 'movie-trailer';
import axios from '../../../api/axios';
import MovieDetail from '../MovieDetail';

import styles from './MovieList.module.css';

const base_url = 'https://image.tmdb.org/t/p/w500';

function MovieList({ title, fetchUrl, isOriginals }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const request = await axios?.get(fetchUrl);
            setMovies(request?.data?.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);


    const handlePoster = (movie) => {
        if (selectedMovie && selectedMovie?.id === movie?.id) {
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

    return (
        <div className={styles.row}>
            <h2 className={styles['movie-list-title']}>{title}</h2>
            <div className={styles.row_posters}>
                {movies.map((movie) => {
                    return (
                        <img
                            key={movie.id}
                            onClick={() => handlePoster(movie)}
                            className={`${styles.row_poster_img} ${isOriginals && styles.row_posterLarge}`}
                            src={`${base_url}${isOriginals ? movie.poster_path : movie.backdrop_path}`}
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
