// import React from 'react';
// import {
// 	BrowserRouter,
// 	Routes,
// 	Route,
// } from "react-router-dom";

// import Browse from './pages/browse/Browse';
// import Search from './pages/search/Search';


// function App() {
// 	return (
// 		<BrowserRouter>
// 		  <Routes>
// 			<Route path="/" element={<Browse/>}/>
// 			<Route path="/search" element={<Search/>}/>
// 		  </Routes>
// 		</BrowserRouter>
// 	  );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_KEY = "27d92bb87e3311b3f837122ee3a9d99a"
function App() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await axios.get(`https://api.themoviedb.org/3/movie/550?api_key=27d92bb87e3311b3f837122ee3a9d99a`);
			setData(response.data);
			setLoading(false);
		} catch (error) {
			setError('An error occurred while fetching data.');
			setLoading(false);
		}
	};

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {error}</p>;
	}
	console.log("data", data)
	return (
		<div>
			<h1>Data:</h1>
			<ul>
				{data?.genres?.map((item, i) => (
					<li key={item.id}>{item.name}</li>
				))}

			</ul>
		</div>
	);
}

export default App;
