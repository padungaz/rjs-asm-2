import React from 'react';

import Banner from '../../components/browse/Banner';
import Nav from '../../components/browse/Nav';

import styles from './Browse..module.css';

function Browse() {
	return (
		<div className={styles.app}>
			<Nav />
			<Banner />
		</div>
	);
}

export default Browse;
