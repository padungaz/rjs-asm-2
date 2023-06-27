import React, { useState, useEffect } from 'react';
import MovieDetail from '../../browse/MovieDetail';
import { API_KEY, base_url, requests } from '../../../api/requests';
import axios from '../../../api/axios';

import styles from './ResultList.module.css';

const ResultList = ({ query }) => {
    const [movies, setMovies] = useState([]);
    const [trailerKey, setTrailerKey] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);

    const url = `${requests.fetchSearch}&query=${query}`;

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
            // Bỏ chọn phim và xóa key của trailer nếu nó đã được chọn
            setSelectedMovie(null);
            setTrailerKey('');
        } else {
            setSelectedMovie(movie.id);
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
        <div className={styles.result_list}>
            <h2>Search Result</h2>
            <div className={styles.row_posters}>
                {query && movies?.length === 0 ? <p>Không có kết quả nào để hiển thị với " {query} "</p>
                    :
                    movies.map((movie) => {
                        return (
                            <div key={movie?.id} className={styles.movies}>
                                <img
                                    className={styles.row_poster_img}
                                    src={`${base_url}${movie?.poster_path}`}
                                    alt={movie.name}
                                    onClick={() => handlePoster(movie)}
                                />
                                {
                                    selectedMovie === movie?.id && <MovieDetail movieData={movie} movieTrailer={trailerKey} base_url={base_url} />
                                }
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default ResultList;
