import React, { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import MovieDetail from '../MovieDetail';
import { API_KEY, base_url } from '../../../api/requests';

import styles from './MovieList.module.css';

function MovieList({ title, fetchUrl, isOriginals }) {
    const [movies, setMovies] = useState([]);
    const [trailerKey, setTrailerKey] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        // fetchData được gọi mỗi khi fetchUrl thay đổi.
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
            setTrailerKey('');
        } else {
            setSelectedMovie(movie);

            // tìm video trailer theo id 
            async function fetchTrailerData() {
                try {
                    const request = await axios?.get(`/movie/${movie?.id}/videos?api_key=${API_KEY}`);
                    setTrailerKey(request?.data?.results[0]?.key);
                    return request;
                } catch (error) {
                    setTrailerKey(null);
                    console.log(error);
                }
            }
            fetchTrailerData();
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
                            src={`${base_url}${isOriginals ? movie?.poster_path : movie?.backdrop_path}`}
                            alt={movie.name}
                        />
                    );
                })}
            </div>
            <div style={{ padding: '40px' }}>
                {selectedMovie && <MovieDetail movieData={selectedMovie} movieTrailer={trailerKey} base_url={base_url} />}
            </div>
        </div>
    );
}

export default MovieList;
