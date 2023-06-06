import React from 'react';
import YouTube from 'react-youtube';

import styles from './MovieDetail.module.css';

const opts = {
    height: '400',
    width: '100%',
    playerVars: {
        autoplay: 0,
    },
};

const MovieDetail = ({ movieTrailer, movieData }) => {
    const { release_date, title, name, overview, vote_average } = movieData;

    return (
        <div className={styles.movie_detail}>
            <div className={styles.movie_detail_data}>
                <h1>{title || name}</h1>
                <hr />

                <h3>Release Date: {release_date}</h3>
                <h3>Vote: {vote_average} / 10</h3>
                <br />
                <p>{overview}</p>
            </div>
            <div className={styles.movie_detail_trailer}>
                <YouTube
                    videoId={movieTrailer}
                    opts={opts}
                />
            </div>
        </div>
    );
}

export default MovieDetail;
