import React from "react";
import { useSidebar } from "../contexts/sidebarContext";
import { Link } from "react-router-dom";
import { useCurrency } from "../contexts/currencyContext";
import { useTheme } from "../contexts/modeContext";
import { IoIosMoon, IoIosSunny } from "react-icons/io";

const Header = () => {
	const { toggleSidebar, isSidebarOpen } = useSidebar();
	const { currency, setCurrency } = useCurrency();
	const { theme, toggleTheme } = useTheme();

	return (
		<header
			className="bg-[#0000009e] p-2 fixed  w-full top-0 right-0 left-0 "
			style={{
				zIndex: "100",
			}}>
			<div className="container flex_center_between gap-2">
				<Link to="/" className="logo text-[20px] text-primary font-semibold">
					CRYPTOFOLIO
				</Link>
				<nav className="flex_center_center gap-1">
					<button onClick={toggleTheme} className="text-primary text-[28px]">
						{theme === "light" ? <IoIosMoon /> : <IoIosSunny />}
					</button>
					<select
						value={currency}
						onChange={(e) => setCurrency(e.target.value)}
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
							value="EUR">
							EUR
						</option>
						<option
							style={{
								color: "white",
								background: "#000000e7",
							}}
							value="UZS">
							UZS
						</option>
					</select>
					<button
						onClick={toggleSidebar}
						className="uppercase bg-primary text-[14px] py-1 px-3 text-black font-bold hover:bg-cyan-600 hover:transition-all w-[150px] max-sm:w-[70px]  max-sm:text-[14px] max-sm:p-1 max-sm:rounded-md">
						{isSidebarOpen ? "Watch List" : "Close List"}
					</button>
				</nav>
			</div>
		</header>
	);
};

export default Header;
