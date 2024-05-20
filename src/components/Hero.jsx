import React, { useContext } from "react";
import { CryptoContext } from "../contexts/cryptoContext";
import { useCurrency } from "../contexts/currencyContext";

const Hero = () => {
	const { data } = useContext(CryptoContext);
	const { currency } = useCurrency();

	console.log(currency);

	return (
		<div className="hero mt-[60px] text-white text-center py-5 flex flex-col gap-5 max-sm:mt-[50px]">
			<div>
				<h1
					className="text-primary text-[60px] max-sm:text-[36px]"
					style={{
						fontWeight: "900",
					}}>
					CRYPTOFOLIO WATCH LIST
				</h1>
				<span className="text-[14px] text-gray-400">
					Get all the Info regarding your favorite Crypto Currency
				</span>
			</div>

			<div className="slider-wrapper-container">
				<div className="slider flex gap-40 max-sm:gap-10">
					{currency === "USD" &&
						data.map((item, i) => (
							<div className="flex flex-col items-center" key={i}>
								<img
									src={item.image}
									alt={item.name}
									style={{
										width: "80px",
										height: "80px",
									}}
								/>
								<p className="text-[18px] uppercase">
									{item.symbol}{" "}
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
								</p>
								<p>
									${" "}
									{item.current_price
										.toFixed(2)
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
								</p>
							</div>
						))}

					{currency === "EUR" &&
						data.map((item, i) => (
							<div className="flex flex-col items-center" key={i}>
								<img
									src={item.image}
									alt={item.name}
									style={{
										width: "80px",
										height: "80px",
									}}
								/>
								<p className="text-[18px] uppercase">
									{item.symbol}{" "}
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
								</p>
								<p>
									<span>€</span>{" "}
									<span>
										{(item.current_price * 0.92)
											.toFixed(2)
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
									</span>
								</p>
							</div>
						))}

					{currency === "UZS" &&
						data.map((item, i) => (
							<div className="flex flex-col items-center" key={i}>
								<img
									src={item.image}
									alt={item.name}
									style={{
										width: "80px",
										height: "80px",
									}}
								/>
								<p className="text-[18px] uppercase">
									{item.symbol}{" "}
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
								</p>
								<p>
									<span>
										{(item.current_price * 12659)
											.toFixed(2)
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
									</span>{" "}
									<span>sum</span>
								</p>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default Hero;
