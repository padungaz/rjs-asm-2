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

const MovieDetail = ({ movieTrailer, movieData, base_url }) => {
    const { release_date, title, name, overview, vote_average } = movieData;
    console.log("movieTrailer", movieTrailer)
    console.log("movieData", movieData)
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
                {movieTrailer ?
                    <YouTube
                        videoId={movieTrailer}
                        opts={opts}
                    />
                    :
                    <img
                        className={styles.backdrop_path_img}
                        src={`${base_url}${movieData?.backdrop_path}`}
                        alt={movieData?.name}
                    />
                }
            </div>
        </div>
    );
}

export default MovieDetail;
