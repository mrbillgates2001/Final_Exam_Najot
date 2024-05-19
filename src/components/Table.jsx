import React, { useContext, useEffect, useState } from "react";
import { CryptoContext } from "../contexts/cryptoContext";
import { MdRemoveRedEye } from "react-icons/md";
import { WatchlistContext } from "../contexts/watchListContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Table = () => {
	const { data } = useContext(CryptoContext);
	const [search, setSearch] = useState("");
	const { isItemSaved, saveItem } = useContext(WatchlistContext);
	const navigate = useNavigate();

	const handleIcon = (item, e) => {
		if (e && e.stopPropagation) {
			e.stopPropagation();
		}
		if (!isItemSaved(item.id)) {
			saveItem(item);
			toast.success(item.name + " added to Watchlist");
		}
	};

	return (
		<div className="container text-center">
			<div className="">
				<h1 className="text-[32px] py-3">
					Cryptocurrency Prices by Market Cap
				</h1>
				<input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					type="serach"
					placeholder="Search For a Crypto Currency..."
					className="w-full text-[18px] p-3 text-white outline-none bg-transparent border-2 border-gray-600 mb-5"
				/>
			</div>

			<div className="pb-10">
				<table className="w-full text-right">
					<thead
						className="bg-primary text-black"
						style={{
							padding: "25px",
						}}>
						<tr className="text-[18px] font-black">
							<th className="w-[40%] p-3 text-left">Coin</th>
							<th className="p-3">Price</th>
							<th className="p-3">24h Changes</th>
							<th className="p-3">Market Cap</th>
						</tr>
					</thead>
					<tbody className="px-5">
						{data
							.filter(
								(item) =>
									item.name.toLowerCase().includes(search.toLowerCase()) ||
									item.symbol.toLowerCase().includes(search.toLowerCase())
							)
							.map((item, i) => (
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
									<td className="p-3">$ {item.current_price}</td>

									<td className="p-3 relative">
										<MdRemoveRedEye
											onClick={(e) => handleIcon(item, e)}
											style={{
												color: isItemSaved(item.id) ? "green" : "white",
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
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Table;
