import React, { useContext } from "react";
import { CryptoContext } from "../contexts/cryptoContext";
import ApexChart from "../components/ApexChart";
import { useParams } from "react-router-dom";

const ViewDetails = () => {
	const { singleCoin, data } = useContext(CryptoContext);
	const { id } = useParams();

	return (
		<div className="mt-[60px] flex ">
			{data
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
						<p className="w-[495px] text-[18px] py-3">
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

			<div className="border-l-2 border-white-700 p-5 my-3 ">
				<ApexChart />
			</div>
		</div>
	);
};

export default ViewDetails;
