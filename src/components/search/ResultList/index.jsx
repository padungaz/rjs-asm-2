import React, { useState, useEffect } from 'react';
import requests from '../../../api/requests';
import axios from '../../../api/axios';
import styles from './ResultList.module.css';

const base_url = 'https://image.tmdb.org/t/p/w500';

const ResultList = ({ query }) => {
    const [movies, setMovies] = useState([]);

    const url = `${requests.fetchSearch}&query=${query}`;

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(url);
            setMovies(request.data.results);
            return request;
        }

        if (query) {
            fetchData();
        } else {
            setMovies([]);
        }
    }, [url, query]);

    return (
        <div className={styles.result_list}>
            <h2>Search Result</h2>
            <div className={styles.row_posters}>
                {query && movies.length === 0 ? <p>Không có kết quả nào để hiển thị với " {query} "</p>
                    :
                    movies.map((movie) => {
                        return (
                            <img
                                key={movie.id}
                                className={styles.row_poster_img}
                                src={`${base_url}${movie?.poster_path}`}
                                alt={movie.name}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default ResultList;
