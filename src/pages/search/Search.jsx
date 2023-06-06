import React, { useState } from "react";
import Nav from "../../components/browse/Nav";
import ResultList from "../../components/search/ResultList";
import SearchForm from "../../components/search/SearchForm";

const Search = () => {
	const [searchKey, setSearchKey] = useState("");
	console.log("searchKey", searchKey)
	const getKeyWord = (key) => {
		setSearchKey(key);
	};

	return (
		<>
			<Nav />
			<SearchForm keyWork={getKeyWord} />
			<ResultList query={searchKey} />
		</>
	);
};

export default Search;