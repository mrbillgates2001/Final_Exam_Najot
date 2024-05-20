import React, { useContext } from "react";
import { useSidebar } from "../contexts/sidebarContext";
import { WatchlistContext } from "../contexts/watchListContext";
import { toast } from "react-toastify";
import { MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useCurrency } from "../contexts/currencyContext";

const WatchList = () => {
	const { isSidebarOpen } = useSidebar();
	const { savedItems, removeItem } = useContext(WatchlistContext);
	const { currency } = useCurrency();
	const navigate = useNavigate();

	const deleteItem = (item, e) => {
		e.stopPropagation();
		removeItem(item.id);
		toast.success(item.name + " removed from watchlist");
		console.log(item);
	};

	return (
		<div
			className="sidebar bg-[#000000d0] max-sm:pt-10 max-sm:fixed max-sm:mt-[7px]"
			style={{
				position: "fixed",
				top: "60px",
				right: "0",
				zIndex: "90",
				overflow: "auto",
				width: "350px",
				height: "100vh",
				color: "white",
				display: "flex",
				gap: "20px",
				flexDirection: "column",
				textAlign: "center",
				alignItems: "center",
				paddingBottom: "50px",
				transition: "transform 0.3s ease-in-out",
				transform: isSidebarOpen ? "translateX(400px)" : "translateX(0px)",
			}}>
			<div className="watchlist">
				<h2 className="uppercase">Watchlist</h2>
				{savedItems.length > 0 ? (
					<div className="flex flex-wrap justify-center items-center p-4 gap-3 mx-auto">
						{currency === "USD" &&
							savedItems.map((item, index) => (
								<div
									onClick={() => navigate(`/crypto-view/${item.id}`)}
									key={index}
									className="border-2 w-[130px] bg-slate-800 h-[180px] flex flex-col items-center justify-center rounded-2xl cursor-pointer">
									<img src={item.image} alt="" className="w-[80px] mx-auto" />
									<h3 className="text-[20px] py-1">${item.current_price}</h3>
									<button
										onClick={(e) => deleteItem(item, e)}
										className="bg-red-600 text-[16px] text-white w-[80px] mx-auto">
										Remove
									</button>
								</div>
							))}

						{currency === "EUR" &&
							savedItems.map((item, index) => (
								<div
									onClick={() => navigate(`/crypto-view/${item.id}`)}
									key={index}
									className="border-2 w-[130px] bg-slate-800 h-[180px] flex flex-col items-center justify-center rounded-2xl cursor-pointer">
									<img src={item.image} alt="" className="w-[80px] mx-auto" />
									<h3 className="text-[20px] py-1">
										€
										{(item.current_price * 0.92)
											.toFixed(2)
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
									</h3>
									<button
										onClick={(e) => deleteItem(item, e)}
										className="bg-red-600 text-[16px] text-white w-[80px] mx-auto">
										Remove
									</button>
								</div>
							))}

						{currency === "UZS" &&
							savedItems.map((item, index) => (
								<div
									onClick={() => navigate(`/crypto-view/${item.id}`)}
									key={index}
									className="border-2 w-[130px] bg-slate-800 h-[180px] flex flex-col items-center justify-center rounded-2xl cursor-pointer">
									<img src={item.image} alt="" className="w-[80px] mx-auto" />
									<h3 className="text-[16px] py-1 flex flex-col">
										<span>
											{(item.current_price * 12659)
												.toFixed(0)
												.toString()
												.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
										</span>
										<span>sum</span>
									</h3>
									<button
										onClick={(e) => deleteItem(item, e)}
										className="bg-red-600 text-[16px] text-white w-[80px] mx-auto">
										Remove
									</button>
								</div>
							))}
					</div>
				) : (
					<div className="flex flex-col text-center items-center justify-center mt-40">
						<h1>WatchList is empty</h1>
						<p className="text-[14px]">
							if you want to add, click icon on main page
						</p>
						<span>
							<MdRemoveRedEye />
						</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default WatchList;
