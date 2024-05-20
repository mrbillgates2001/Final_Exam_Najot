import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Table from "../components/Table";
import WatchList from "../components/WatchList";

const Home = () => {
	return (
		<div>
			<Header />
			<Hero />
			<Table />
			<WatchList />
		</div>
	);
};

export default Home;
