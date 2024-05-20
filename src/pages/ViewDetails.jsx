import React, { useContext } from "react";
import { CryptoContext } from "../contexts/cryptoContext";
import ApexChart from "../components/ApexChart";
import { useNavigate, useParams } from "react-router-dom";
import { useCurrency } from "../contexts/currencyContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useTheme } from "../contexts/modeContext";

const ViewDetails = () => {
	const { singleCoin, data } = useContext(CryptoContext);
	const { theme } = useTheme();
	const { currency } = useCurrency();
	const { id } = useParams();
	const navigate = useNavigate();

	return (
		<div className="mt-[60px] flex pb-[33px] relative max-sm:flex-wrap">
			<button
				onClick={() => navigate("/")}
				className="text-[35px] text-black absolute top-5 left-5"
				style={{
					zIndex: 10,
				}}>
				<IoMdArrowRoundBack
					style={{
						color: theme === "light" ? "black" : "white",
					}}
				/>
			</button>
			<div>
				{currency === "USD" &&
					data
						.filter((item) => item.id === id)
						.map((item, i) => (
							<div className="p-3" key={i}>
								<div key={i}>
									<img
										src={item.image}
										alt={item.id}
										className="w-[200px] h-[200px] mx-auto"
									/>
									<h1 className="text-center">
										<strong className="text-[56px]">{item.name}</strong>
									</h1>
								</div>
								<p className="w-[495px] text-[18px] py-3 max-sm:w-[350px] ">
									{item.name}
									{singleCoin.description?.en?.slice(7, 189)}
								</p>
								<h3>
									<strong>Rank:</strong> <span>{item?.market_cap_rank}</span>
								</h3>
								<h3>
									<strong>Current Price: </strong>{" "}
									<span>
										${" "}
										{item?.current_price
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
									</span>
								</h3>
								<h3>
									<strong>Market Cap: </strong>
									<span>$</span>{" "}
									<span>
										{item.market_cap
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
										M
									</span>
								</h3>
							</div>
						))}

				{currency === "EUR" &&
					data
						.filter((item) => item.id === id)
						.map((item, i) => (
							<div className="p-3" key={i}>
								<div key={i}>
									<img
										src={item.image}
										alt={item.id}
										className="w-[200px] h-[200px] mx-auto"
									/>
									<h1 className="text-center">
										<strong className="text-[56px]">{item.name}</strong>
									</h1>
								</div>
								<p className="w-[495px] text-[18px] py-3 max-sm:w-[350px]">
									{item.name}
									{singleCoin.description?.en?.slice(7, 189)}
								</p>
								<h3>
									<strong>Rank:</strong> <span>{item?.market_cap_rank}</span>
								</h3>
								<h3>
									<strong>Current Price: </strong>{" "}
									<span>
										€{" "}
										{(item?.current_price * 0.92)
											.toFixed(2)
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
									</span>
								</h3>
								<h3>
									<strong>Market Cap: </strong>
									<span>€</span>{" "}
									<span>
										{(item.market_cap * 0.92)
											.toFixed(2)
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
										M
									</span>
								</h3>
							</div>
						))}

				{currency === "UZS" &&
					data
						.filter((item) => item.id === id)
						.map((item, i) => (
							<div className="p-3" key={i}>
								<div key={i}>
									<img
										src={item.image}
										alt={item.id}
										className="w-[200px] h-[200px] mx-auto"
									/>
									<h1 className="text-center">
										<strong className="text-[56px]">{item.name}</strong>
									</h1>
								</div>
								<p className="w-[495px] text-[18px] py-3 max-sm:w-[350px]">
									{item.name}
									{singleCoin.description?.en?.slice(7, 189)}
								</p>
								<h3>
									<strong>Rank:</strong> <span>{item?.market_cap_rank}</span>
								</h3>
								<h3>
									<strong>Current Price: </strong>{" "}
									<span>
										{(item?.current_price * 12569)
											.toFixed(2)
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
										sum
									</span>
								</h3>
								<h3>
									<strong>Market Cap: </strong>
									<span>
										{(item.market_cap * 12569)
											.toFixed(2)
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
										M
									</span>{" "}
									<span>sum</span>
								</h3>
							</div>
						))}
			</div>

			<div className="border-l-2 border-white-700 p-3 my-3 max-sm:overflow-x-auto">
				<ApexChart />
			</div>
		</div>
	);
};

export default ViewDetails;
