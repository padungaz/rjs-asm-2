import React, { useState, useEffect } from 'react';

import styles from "./Banner.module.css";
import requests from '../../../api/requests';
import instance from '../../../api/axios';

const base_url = 'https://image.tmdb.org/t/p/w500';

function Banner() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await instance.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }
        fetchData();
    }, []);

    const backdropLink = `${base_url}${movie.backdrop_path}`;

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    }

    return (
        <header className={styles.banner}  >
            <img src={backdropLink} alt="" className={styles.bannerImg} />
            <div className={styles.banner_contents}>
                <h1 className={styles.banner_title}>
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                <div className={styles.banner_buttons}>
                    <button className={styles.banner_button}>Play</button>
                    <button className={styles.banner_button}>My List</button>
                </div>
                <h1 className={styles.banner_description}>
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>
        </header>
    );
}

export default Banner;




