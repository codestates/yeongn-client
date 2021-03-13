import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import "../styles/Shop.css";
import shop from "../assets/img/shop.png";
import ShopPopularity from "../components/ShopPopularity";
import ScrollToTop from "../components/ScrollToTop";
import ArrowUp from "../components/ArrowUp";
import Loading from "../components/Loading";

function Shop() {
	const [shopList, setShopList] = useState<any>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		axios
			.get(`https://www.yeongn.com/api/shop`)
			.then((res) => {
				setIsLoading(true);
				setShopList(res.data);
			})
			.catch((err) => alert(err));
	}, []);

	return (
		<div>
			{!isLoading || !shopList ? <Loading /> : null}
			<ScrollToTop />
			<section className="Shop__main">
				<div className="Shop__main__container">
					<div className="Shop__main__wrap">
						<div className="Shop__main__title">
							흥미로운 물건을 가지고 있다면
							<br />
							판매 해보세요!
						</div>
						<Link to={`/register/shop`}>
							<button className="Shop__main__button">
								즉시 나의 물건 판매하기
							</button>
						</Link>
					</div>
					<img src={shop} alt="shop" className="Shop__main__image"></img>
				</div>
			</section>
			<ShopPopularity />
			<div className="Appraisal__division__line"></div>
			<ArrowUp />
		</div>
	);
}

export default withRouter(Shop);
