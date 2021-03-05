import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import "../styles/ShopAllLists.css";

type CategoryTitleProps = {
	categoryTitle: string;
	initialState: any;
};

function ShopAllList({ categoryTitle, initialState }: CategoryTitleProps) {
	const [count, setCount] = useState<number>(9);
	const [shopList, setShopList] = useState(initialState);
	const [category, setCategory] = useState(categoryTitle);

	useEffect(() => {
		filterCategory(categoryTitle);
		setCategory(categoryTitle);
	});

	const filterCategory = (categoryTitle: string): void => {
		if (categoryTitle === "전체" || categoryTitle === "전체 판매") {
			setShopList(initialState);
		} else if (categoryTitle === "높은 가격") {
			const highPriceData = shopList.sort(function (a: any, b: any) {
				return a.price < b.price ? 1 : -1;
			});
			setShopList(highPriceData);
		} else if (categoryTitle === "낮은 가격") {
			const highPriceData = shopList.sort(function (a: any, b: any) {
				return a.price > b.price ? 1 : -1;
			});
			setShopList(highPriceData);
		} else {
			setShopList(shopList.filter((el: any) => el.category === categoryTitle));
		}
	};
	const moreButtonClick = (): void => {
		setCount((count) => count + 6);
	};

	return (
		<section className="shopAllList">
			<div className="shopAllList__title__wrap">
				<div className="shopAllList__title">{`${categoryTitle} 리스트`}</div>
			</div>
			<div className="shopAllList__container">
				{shopList.slice(0, count).map((shopList: any) => (
					<div className="shopAllList__container__card" key={shopList.id}>
						<Link to={`/shop/${shopList.id}`} key={shopList.id}>
							<div className="shopAllList__container__img"></div>
							<div className="shopAllList__container__wrap">
								<div className="shopAllList__container__title">
									{shopList.name}
								</div>
								<span className="shopAllList__container__price">
									<span className="shopAllList__container__price">감정가 </span>
									{shopList.price
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
									원{" "}
								</span>
							</div>
						</Link>
					</div>
				))}
			</div>
			<div className="shopAllList__container__moreButton">
				<KeyboardArrowDownIcon fontSize="inherit" onClick={moreButtonClick} />
			</div>
		</section>
	);
}

export default ShopAllList;
