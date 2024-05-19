import axios from "axios";
import { createContext, useEffect, useState } from "react";

const CryptoContext = createContext(null);

const Provider = ({ children }) => {
	const [data, setData] = useState([]);
	const [singleCoin, setSingleCoin] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchData = async () => {
		try {
			setIsLoading(true);
			const res = await axios.get(
				"https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h"
			);
			setData(res.data);
			setIsLoading(false);
		} catch (error) {
			setError(error.message);
			setIsLoading(false);
		}
	};

	const fetchSingleOne = async () => {
		try {
			setIsLoading(true);
			const res = await axios.get(
				`https://api.coingecko.com/api/v3/coins/bitcoin`
			);
			setSingleCoin(res.data);
			setIsLoading(false);
		} catch (error) {
			setError(error.message);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
		fetchSingleOne();
	}, []);

	return (
		<CryptoContext.Provider value={{ data, singleCoin, isLoading, error }}>
			{children}
		</CryptoContext.Provider>
	);
};
export { CryptoContext, Provider };
