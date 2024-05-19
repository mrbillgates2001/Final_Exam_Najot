import React, { useContext, useState } from "react";
import Chart from "react-apexcharts";
import moment from "moment";
import { CryptoContext } from "../contexts/cryptoContext";
import { useParams } from "react-router-dom";

const ApexChart = () => {
	const [selectedPeriod, setSelectedPeriod] = useState("24 Hours");
	const { singleCoin, data } = useContext(CryptoContext);
	const { id } = useParams();

	console.log(singleCoin);

	const datum = data.filter((item) => item.id === id);

	console.log(datum[0]);

	const periods = ["24 Hours", "30 Days", "3 Months", "1 Year"];

	const dataOfCoin = {
		"24 Hours": {
			x: Array.from({ length: 24 }, (_, i) =>
				moment().subtract(i, "hours").format("hh:mm A")
			).reverse(),
			y: Array.from(
				{ length: 24 },
				() => Math.floor(Math.random() * datum[0]?.high_24h) + 1
			),
		},
		"30 Days": {
			x: Array.from({ length: 30 }, (_, i) =>
				moment().subtract(i, "days").format("MMM D")
			).reverse(),
			y: Array.from(
				{ length: 30 },
				() => Math.floor(Math.random() * datum[0]?.high_24h) + 1
			),
		},
		"3 Months": {
			x: Array.from({ length: 90 }, (_, i) =>
				moment().subtract(i, "days").format("MMM D")
			).reverse(),
			y: Array.from(
				{ length: 90 },
				() => Math.floor(Math.random() * datum[0]?.high_24h) + 1
			),
		},
		"1 Year": {
			x: Array.from({ length: 365 }, (_, i) =>
				moment().subtract(i, "days").format("MMM D")
			).reverse(),
			y: Array.from(
				{ length: 365 },
				() => Math.floor(Math.random() * datum[0]?.high_24h) + 1
			),
		},
	};

	const chartData = {
		series: [
			{
				name: datum[0]?.name,
				data: dataOfCoin[selectedPeriod].y,
			},
		],
		options: {
			chart: {
				type: "line",
				height: 350,
				zoom: {
					enabled: true,
				},
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				curve: "smooth",
			},
			title: {
				text: `Price of ${datum[0]?.name} - ${selectedPeriod}`,
				align: "left",
				backgroundColor: "red",
				color: "red",
				fontSize: "20px",
				fontWeight: "bold",
			},
			grid: {
				row: {
					colors: ["black", "transparent"],
					opacity: 0.9,
				},
			},
			xaxis: {
				categories: dataOfCoin[selectedPeriod].x,
			},
		},
	};

	return (
		<div className="container">
			<div className="chart">
				<Chart
					options={chartData.options}
					series={chartData.series}
					type="line"
					height={500}
					width={900}
				/>
			</div>
			<div className="buttons flex items-center justify-center gap-1">
				{periods.map((period) => (
					<button
						key={period}
						onClick={() => setSelectedPeriod(period)}
						style={{
							fontSize: "18px",
							fontWeight: selectedPeriod === period ? "bold" : "normal",
							borderRadius: "5px",
							margin: "5px",
							padding: "5px 25px",
							backgroundColor:
								selectedPeriod === period ? "#87CEEB" : "transparent",
							color: selectedPeriod === period ? "black" : "white",
							border:
								selectedPeriod === period
									? "1px solid transparent"
									: "1px solid #87CEEB",
						}}>
						{period}
					</button>
				))}
			</div>
		</div>
	);
};

export default ApexChart;
