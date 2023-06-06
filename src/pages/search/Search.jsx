import React from "react";
import Nav from "../../components/browse/Nav";
import ResultList from "../../components/search/ResultList";
import SearchForm from "../../components/search/SearchForm";

const Search = () => {

	return (
		<div className="app">
			<Nav />
			<SearchForm />
			<ResultList />
		</div>
	);
};

export default Search;