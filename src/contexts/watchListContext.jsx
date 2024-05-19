import React, { createContext, useEffect, useState } from "react";

// Context yaratish
const WatchlistContext = createContext();

const WatchlistProvider = ({ children }) => {
	const [savedItems, setSavedItems] = useState([]);

	// LocalStorage dan saqlangan itemlarni olish
	useEffect(() => {
		const storedItems = JSON.parse(localStorage.getItem("savedItems")) || [];
		setSavedItems(storedItems);
	}, []);

	// LocalStorage ga saqlash funksiyasi
	const saveItem = (item) => {
		const updatedItems = [
			...savedItems,
			{
				id: item.id,
				name: item.name,
				current_price: item.current_price,
				image: item.image,
			},
		];
		setSavedItems(updatedItems);
		localStorage.setItem("savedItems", JSON.stringify(updatedItems));
	};

	// LocalStorage dan o'chirish funksiyasi
	const removeItem = (id) => {
		const updatedItems = savedItems.filter((item) => item.id !== id);
		setSavedItems(updatedItems);
		localStorage.setItem("savedItems", JSON.stringify(updatedItems));
	};

	// Ma'lumot saqlanganligini tekshirish funksiyasi
	const isItemSaved = (id) => {
		return savedItems.some((item) => item.id === id);
	};

	return (
		<WatchlistContext.Provider
			value={{ savedItems, saveItem, removeItem, isItemSaved }}>
			{children}
		</WatchlistContext.Provider>
	);
};

export { WatchlistContext, WatchlistProvider };
