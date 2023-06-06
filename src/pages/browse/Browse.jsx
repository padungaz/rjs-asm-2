import React from 'react';

import requests from '../../api/requests';
import MovieList from '../../components/browse/MovieLis';
import Banner from '../../components/browse/Banner';
import Nav from '../../components/browse/Nav';

import styles from './Browse..module.css';

function Browse() {
	return (
		<div className={styles.app}>
			<Nav />
			<Banner />
			<MovieList title="" isOriginals fetchUrl={requests.fetchNetflixOriginals} />
			<MovieList title="Xu hướng" fetchUrl={requests.fetchTrending} />
			<MovieList title="Xếp hạng cao" fetchUrl={requests.fetchTopRated} />
			<MovieList title="Hành động" fetchUrl={requests.fetchActionMovies} />
			<MovieList title="Hài" fetchUrl={requests.fetchComedyMovies} />
			<MovieList title="Kinh dị" fetchUrl={requests.fetchHorrorMovies} />
			<MovieList title="Lãng mạn" fetchUrl={requests.fetchRomanceMovies} />
			<MovieList title="Tài liệu" fetchUrl={requests.fetchDocumentaries} />
		</div>
	);
}

export default Browse;
