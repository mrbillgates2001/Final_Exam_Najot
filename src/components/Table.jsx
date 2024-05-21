import React, { useContext, useState } from "react";
import { CryptoContext } from "../contexts/cryptoContext";
import { MdRemoveRedEye } from "react-icons/md";
import { WatchlistContext } from "../contexts/watchListContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCurrency } from "../contexts/currencyContext";
import ClipLoader from "react-spinners/ClipLoader";

const Table = () => {
	const { data, isLoading, override } = useContext(CryptoContext);
	const [search, setSearch] = useState("");
	const { isItemSaved, saveItem } = useContext(WatchlistContext);
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(1);
	const { currency } = useCurrency();
	const rowsPerPage = 5;

	const [sortCriteria, setSortCriteria] = useState(null);
	const [sortOrder, setSortOrder] = useState("asc");

	const handleIcon = (item, e) => {
		if (e && e.stopPropagation) {
			e.stopPropagation();
		}
		if (!isItemSaved(item.id)) {
			saveItem(item);
			toast.success(item.name + " added to Watchlist");
		}
	};

	const handleSort = (criteria) => {
		const order =
			sortCriteria === criteria && sortOrder === "asc" ? "desc" : "asc";
		setSortCriteria(criteria);
		setSortOrder(order);
	};

	const getSortedData = (data) => {
		if (!sortCriteria) return data;

		return data.sort((a, b) => {
			const valueA = sortCriteria === "price" ? a.current_price : a.market_cap;
			const valueB = sortCriteria === "price" ? b.current_price : b.market_cap;

			if (sortOrder === "asc") {
				return valueA - valueB;
			} else {
				return valueB - valueA;
			}
		});
	};

	const filteredData = getSortedData(
		data.filter(
			(item) =>
				item.name.toLowerCase().includes(search.toLowerCase()) ||
				item.symbol.toLowerCase().includes(search.toLowerCase())
		)
	);

	const pageCount = Math.ceil(filteredData.length / rowsPerPage);
	const startIndex = (currentPage - 1) * rowsPerPage;
	const selectedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

	const handlePageChange = (page) => {
		if (page > 0 && page <= pageCount) {
			setCurrentPage(page);
		}
	};

	const renderPageNumbers = () => {
		const pageNumbers = [];
		const maxPageNumbersToShow = 5;
		const halfPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);

		let startPage = Math.max(1, currentPage - halfPageNumbersToShow);
		let endPage = Math.min(pageCount, currentPage + halfPageNumbersToShow);

		if (currentPage <= halfPageNumbersToShow) {
			endPage = Math.min(pageCount, maxPageNumbersToShow);
		}

		if (currentPage + halfPageNumbersToShow >= pageCount) {
			startPage = Math.max(1, pageCount - maxPageNumbersToShow + 1);
		}

		if (startPage > 1) {
			pageNumbers.push(
				<button key="1" onClick={() => handlePageChange(1)} className="px-2">
					1
				</button>
			);
			if (startPage > 2) {
				pageNumbers.push(<span key="ellipsis1">...</span>);
			}
		}

		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(
				<button
					key={i}
					onClick={() => handlePageChange(i)}
					className={`px-5 ${
						currentPage === i
							? "bg-primary bg-opacity-10 px-5 text-white rounded-full"
							: "bg-transparent text-primary "
					}`}>
					{i}
				</button>
			);
		}

		if (endPage < pageCount) {
			if (endPage < pageCount - 1) {
				pageNumbers.push(<span key="ellipsis2">...</span>);
			}
			pageNumbers.push(
				<button
					key={pageCount}
					onClick={() => handlePageChange(pageCount)}
					className="px-2">
					{pageCount}
				</button>
			);
		}

		return pageNumbers;
	};

	return (
		<div className="container text-center">
			<div className="">
				<h1 className="text-[32px] py-3">
					Cryptocurrency Prices by Market Cap
				</h1>
				<input
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
						setCurrentPage(1);
					}}
					type="search"
					placeholder="Search For a Crypto Currency..."
					className="w-full text-[18px] p-3 text-white outline-none bg-transparent border-2 border-gray-600 mb-5"
				/>
			</div>

			<div className="pb-10 max-sm:overflow-x-auto">
				{isLoading ? (
					<ClipLoader
						color="white"
						loading={isLoading}
						cssOverride={override}
						size={150}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
				) : (
					<table className="w-full text-right">
						<thead
							className="bg-primary text-black"
							style={{
								padding: "25px",
							}}>
							<tr className="text-[18px] font-black">
								<th className="w-[40%] p-3 text-left">Coin</th>
								<th
									className="p-3 cursor-pointer"
									onClick={() => handleSort("price")}>
									Price{" "}
									{sortCriteria === "price" &&
										(sortOrder === "asc" ? "▲" : "▼")}
								</th>
								<th className="p-3">24h Changes</th>
								<th
									className="p-3 cursor-pointer"
									onClick={() => handleSort("market_cap")}>
									Market Cap{" "}
									{sortCriteria === "market_cap" &&
										(sortOrder === "asc" ? "▲" : "▼")}
								</th>
							</tr>
						</thead>
						<tbody className="px-5">
							{currency === "USD" &&
								selectedData.map((item, i) => (
									<tr
										onClick={() => navigate(`/crypto-view/${item.id}`)}
										className="hover:bg-opacity-10 cursor-pointer hover:bg-slate-300 border-b-2 border-b-gray-100 text-[18px]"
										key={i}>
										<td className="w-[40%] p-3 text-left">
											<div className="flex gap-2">
												<img
													src={item.image}
													alt={item.name}
													className="w-10 h-10"
												/>
												<div className="flex flex-col">
													<span className="text-[24px] uppercase">
														{item.symbol}
													</span>
													<span className="text-[14px] text-gray-500">
														{item.name}
													</span>
												</div>
											</div>
										</td>
										<td className="p-3">
											${" "}
											{item.current_price
												.toString()
												.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
										</td>

										<td className="p-3 relative">
											<MdRemoveRedEye
												onClick={(e) => handleIcon(item, e)}
												style={{
													color: isItemSaved(item.id) ? "#00ff00ed" : "white",
													cursor: isItemSaved(item.id)
														? "not-allowed"
														: "pointer",
												}}
												className="absolute top-[35px] right-16 text-[24px]"
											/>
											<span className="text-green-500">
												{item.price_change_percentage_24h > 0 ? "+" : ""}
											</span>
											<span
												style={{
													color:
														item.price_change_percentage_24h < 0
															? "red"
															: "#00C832",
												}}>
												{item.price_change_percentage_24h.toFixed(2)}
											</span>
											<span
												className="text-green-500"
												style={{
													color:
														item.price_change_percentage_24h > 0
															? "#00C832"
															: "red",
												}}>
												%
											</span>
										</td>

										<td className="p-3">
											<span>$</span>{" "}
											<span>
												{item.market_cap
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
												M
											</span>
										</td>
									</tr>
								))}

							{currency === "EUR" &&
								selectedData.map((item, i) => (
									<tr
										onClick={() => navigate(`/crypto-view/${item.id}`)}
										className="hover:bg-opacity-10 cursor-pointer hover:bg-slate-300 border-b-2 border-b-gray-100 text-[18px]"
										key={i}>
										<td className="w-[40%] p-3 text-left">
											<div className="flex gap-2">
												<img
													src={item.image}
													alt={item.name}
													className="w-10 h-10"
												/>
												<div className="flex flex-col">
													<span className="text-[24px] uppercase">
														{item.symbol}
													</span>
													<span className="text-[14px] text-gray-500">
														{item.name}
													</span>
												</div>
											</div>
										</td>
										<td className="p-3">
											€{" "}
											{(item.current_price * 0.92)
												.toFixed(2)
												.toString()
												.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
										</td>

										<td className="p-3 relative">
											<MdRemoveRedEye
												onClick={(e) => handleIcon(item, e)}
												style={{
													color: isItemSaved(item.id) ? "#00ff00ed" : "white",
													cursor: isItemSaved(item.id)
														? "not-allowed"
														: "pointer",
												}}
												className="absolute top-[35px] right-16 text-[24px]"
											/>
											<span className="text-green-500">
												{item.price_change_percentage_24h > 0 ? "+" : ""}
											</span>
											<span
												style={{
													color:
														item.price_change_percentage_24h < 0
															? "red"
															: "#00C832",
												}}>
												{item.price_change_percentage_24h.toFixed(2)}
											</span>
											<span
												className="text-green-500"
												style={{
													color:
														item.price_change_percentage_24h > 0
															? "#00C832"
															: "red",
												}}>
												%
											</span>
										</td>

										<td className="p-3">
											<span>€</span>{" "}
											<span>
												{(item.market_cap * 0.92)
													.toFixed(2)
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
												M
											</span>
										</td>
									</tr>
								))}

							{currency === "UZS" &&
								selectedData.map((item, i) => (
									<tr
										onClick={() => navigate(`/crypto-view/${item.id}`)}
										className="hover:bg-opacity-10 cursor-pointer hover:bg-slate-300 border-b-2 border-b-gray-100 text-[18px]"
										key={i}>
										<td className="w-[40%] p-3 text-left">
											<div className="flex gap-2">
												<img
													src={item.image}
													alt={item.name}
													className="w-10 h-10"
												/>
												<div className="flex flex-col">
													<span className="text-[24px] uppercase">
														{item.symbol}
													</span>
													<span className="text-[14px] text-gray-500">
														{item.name}
													</span>
												</div>
											</div>
										</td>
										<td className="p-3">
											{(item.current_price * 12659)
												.toFixed(2)
												.toString()
												.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
											sum
										</td>

										<td className="p-3 relative">
											<MdRemoveRedEye
												onClick={(e) => handleIcon(item, e)}
												style={{
													color: isItemSaved(item.id) ? "#00ff00ed" : "white",
													cursor: isItemSaved(item.id)
														? "not-allowed"
														: "pointer",
												}}
												className="absolute top-[35px] right-16 text-[24px]"
											/>
											<span className="text-green-500">
												{item.price_change_percentage_24h > 0 ? "+" : ""}
											</span>
											<span
												style={{
													color:
														item.price_change_percentage_24h < 0
															? "red"
															: "#00C832",
												}}>
												{item.price_change_percentage_24h.toFixed(2)}
											</span>
											<span
												className="text-green-500"
												style={{
													color:
														item.price_change_percentage_24h > 0
															? "#00C832"
															: "red",
												}}>
												%
											</span>
										</td>

										<td className="p-3">
											<span>
												{(item.market_cap * 12659)
													.toFixed(2)
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
												M
											</span>{" "}
											<span>sum</span>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				)}
			</div>

			<div className="flex justify-center pb-10 space-x-2 text-primary">
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					className="px-2"
					disabled={currentPage === 1}>
					{"<"}
				</button>
				{renderPageNumbers()}
				<button
					onClick={() => handlePageChange(currentPage + 1)}
					className="px-2"
					disabled={currentPage === pageCount}>
					{">"}
				</button>
			</div>
		</div>
	);
};

export default Table;
