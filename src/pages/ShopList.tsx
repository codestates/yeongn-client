import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import ShopCategory from "../components/ShopCategory";
import ShopAllList from "../components/ShopAllList";
import ScrollToTop from "../components/ScrollToTop";
import ArrowUp from "../components/ArrowUp";

function ShopList() {
	const [categoryTitle, setCategoryTitle] = useState<string>("전체 판매");
	const [shopList, setShopList] = useState<any>([]);

	useEffect(() => {
		axios
			.get(`/api/shop`)
			.then((res) => {
				setShopList(res.data);
			})
			.catch((err) => alert(err));
	}, []);

	return (
		<div>
			<ScrollToTop />
			<ShopCategory
				setCategoryTitle={setCategoryTitle}
				setShopList={setShopList}
			/>
			<ShopAllList categoryTitle={categoryTitle} shopList={shopList} />
			<ArrowUp />
		</div>
	);
}

export default withRouter(ShopList);
