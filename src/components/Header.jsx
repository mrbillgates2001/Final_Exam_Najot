import React from "react";
import { useSidebar } from "../contexts/sidebarContext";
import { Link } from "react-router-dom";

const Header = () => {
	const handleChange = (value) => {
		console.log(`selected ${value}`);
	};
	const { toggleSidebar, isSidebarOpen } = useSidebar();

	return (
		<header
			className="bg-[#0000009e] p-2 fixed w-full top-0 right-0 left-0 "
			style={{
				zIndex: "100",
			}}>
			<div className="container flex_center_between ">
				<Link to="/" className="logo text-[20px] text-primary font-semibold">
					CRYPTOFOLIO
				</Link>
				<nav className="flex_center_between gap-2">
					<select
						style={{
							border: "none",
							outline: "none",
							fontSize: "14px",
							color: "white",
							background: "transparent",
							padding: "10px",
						}}
						name="currency"
						id="currency">
						<option
							style={{
								color: "white",
								background: "#000000e7",
							}}
							value="USD">
							USD
						</option>
						<option
							style={{
								color: "white",
								background: "#000000e7",
							}}
							value="USD">
							UZS
						</option>
						<option
							style={{
								color: "white",
								background: "#000000e7",
							}}
							value="USD">
							EUR
						</option>
					</select>
					<button
						onClick={toggleSidebar}
						className="uppercase bg-primary text-[14px] py-1 px-3 text-black font-bold hover:bg-cyan-600 hover:transition-all w-[150px]">
						{isSidebarOpen ? "Watch List" : "Close List"}
					</button>
				</nav>
			</div>
		</header>
	);
};

export default Header;
