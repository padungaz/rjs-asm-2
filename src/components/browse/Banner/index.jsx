import React, { useState, useEffect } from 'react';
import requests from '../../../api/requests';
import axios from '../../../api/axios';

import styles from "./Banner.module.css";

const base_url = 'https://image.tmdb.org/t/p/w500';

function Banner() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        // khi component được render lấy data của fetchNetflixOriginals và random 1 movie
        async function fetchData() {
            const request = await axios?.get(requests?.fetchNetflixOriginals);
            setMovie(
                request?.data?.results[
                Math?.floor(Math?.random() * request?.data?.results?.length - 1)
                ]
            );
            return request;
        }
        fetchData();
    }, []);

    const backdropLink = `${base_url}${movie?.backdrop_path}`;/* URL của hình ảnh nền của phim */

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
                <h3 className={styles.banner_description}> {movie?.overview}</h3>
            </div>
        </header>
    );
}

export default Banner;




