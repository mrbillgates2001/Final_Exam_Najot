import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Provider } from "./contexts/cryptoContext";
import ViewDetails from "./pages/ViewDetails";
import { SidebarProvider } from "./contexts/sidebarContext";
import { WatchlistProvider } from "./contexts/watchListContext";
import Header from "./components/Header";
import WatchList from "./components/WatchList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CurrencyProvider } from "./contexts/currencyContext";
import { ThemeProvider } from "./contexts/modeContext";

const App = () => {
	return (
		<Provider>
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				style={{
					fontSize: "14px",
				}}
			/>
			<ThemeProvider>
				<div className="">
					<CurrencyProvider>
						<WatchlistProvider>
							<SidebarProvider>
								<Router>
									<Header />
									<WatchList />
									<Routes>
										<Route path="/" element={<Home />} />
										<Route path="/crypto-view/:id" element={<ViewDetails />} />
									</Routes>
								</Router>
							</SidebarProvider>
						</WatchlistProvider>
					</CurrencyProvider>
				</div>
			</ThemeProvider>
		</Provider>
	);
};

export default App;
