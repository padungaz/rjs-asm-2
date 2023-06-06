import React, { useState, useEffect } from 'react';

import styles from "./Banner.module.css";
import requests from '../../../api/requests';
import instance from '../../../api/axios';

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
            Math.floor(Math.random() * request.data.results.length - 1)
            return request;
        }
        fetchData();
    }, []);

    console.log(movie)

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    }

    return (
        <header
            className={styles.banner}
            style={{
                backgroundSize: 'cover',
                backgroundImage: `url(
        	"https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        	)`,
                backgroundPosition: 'center center',
            }}
        >
            <div className={styles.banner_contents}>
                <h1 className={styles.banner_title}>
                    {movie?.title || movie?.name || movie?.original_name}
                    movie
                </h1>

                <div className={styles.banner_buttons}>
                    <button className={styles.banner_button}>Play</button>
                    <button className={styles.banner_button}>My List</button>
                </div>
                <h1 className={styles.banner_description}>
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>

            <div className={styles.bannerFadeBottom} />
        </header>
    );
}

export default Banner;




