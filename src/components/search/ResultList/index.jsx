import React, { useState, useEffect } from 'react';
import movieTrailer from 'movie-trailer';
import MovieDetail from '../../browse/MovieDetail';
import requests from '../../../api/requests';
import axios from '../../../api/axios';
import styles from './ResultList.module.css';

const base_url = 'https://image.tmdb.org/t/p/w500';

const ResultList = ({ query }) => {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);

    const url = `${requests.fetchSearch}&query=${query}`;
    console.log("selectedMovie", selectedMovie)
    console.log("trailerUrl", trailerUrl)
    useEffect(() => {
        // fetchData khi url, query thay dổi
        async function fetchData() {
            const request = await axios?.get(url);
            setMovies(request?.data?.results);
            return request;
        }
        // check query
        if (query) {
            fetchData();
        } else {
            setMovies([]);
        }
    }, [url, query]);


    const handlePoster = (movie) => {
        if (selectedMovie === movie?.id) {
            // Bỏ chọn phim và xóa URL của trailer nếu nó đã được chọn
            setSelectedMovie(null);
            setTrailerUrl('');
        } else {
            setSelectedMovie(movie.id);
            // Lấy URL trailer của phim đã chọn
            movieTrailer(movie?.name || movie?.title || movie?.original_title || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url)?.search);
                    setTrailerUrl(urlParams.get('v'));
                })
                .catch((error) => console.log(error));
        }
    };


    return (
        <div className={styles.result_list}>
            <h2>Search Result</h2>
            <div className={styles.row_posters}>
                {query && movies?.length === 0 ? <p>Không có kết quả nào để hiển thị với " {query} "</p>
                    :
                    movies.map((movie) => {
                        return (
                            <div className={styles.movies}>
                                <img
                                    key={movie?.id}
                                    className={styles.row_poster_img}
                                    src={`${base_url}${movie?.poster_path}`}
                                    alt={movie.name}
                                    onClick={() => handlePoster(movie)}
                                />
                                {
                                    selectedMovie === movie?.id && <MovieDetail movieData={movie} movieTrailer={trailerUrl} />
                                }
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default ResultList;
