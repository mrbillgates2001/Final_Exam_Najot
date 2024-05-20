import React from "react";
import { useSidebar } from "../contexts/sidebarContext";
import { Link } from "react-router-dom";
import { useCurrency } from "../contexts/currencyContext";
import { useTheme } from "../contexts/modeContext";
import { IoIosMoon, IoIosSunny } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";

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
				<div className="flex items-center gap-2">
					<Link
						to="/"
						className="logo text-[20px] max-sm:hidden text-primary font-semibold">
						CRYPTOFOLIO
					</Link>
					<Link
						to="/"
						className="hidden max-sm:block logo text-[20px] text-primary font-semibold">
						<img src="logo.png" alt="" width={40} height={40} />
					</Link>
				</div>

				<nav className="flex_center_center gap-4">
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
					<div>
						<button
							onClick={toggleSidebar}
							className="uppercase bg-primary text-[14px] py-1 px-3 text-black font-bold hover:bg-cyan-600 hover:transition-all w-[150px] max-sm:hidden">
							{isSidebarOpen ? "Watch List" : "Close List"}
						</button>
						<button onClick={toggleSidebar} className="hidden max-sm:block">
							{isSidebarOpen ? <GiHamburgerMenu /> : <MdClose />}
						</button>
					</div>
				</nav>
			</div>
		</header>
	);
};

export default Header;
