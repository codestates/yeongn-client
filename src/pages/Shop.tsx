import React from "react";
import { Link, withRouter } from "react-router-dom";
import Header from "../components/Header"
import "../styles/Shop.css"
import shop from "../assets/img/shop.png";
import ShopPopularity from "../components/ShopPopularity"


function Shop() {
	return (
		<div>
			<Header/>
			<section className="Shop__main">
				<div className="Shop__main__container">
					<div className="Shop__main__wrap">
						<div className="Shop__main__title">
							흥미로운 물건을 가지고 있다면<br/>판매 해보세요!
						</div>
						<Link to={`/register/shop`}>
							<button className="Shop__main__button">즉시 나의 물건 판매하기</button>
						</Link>
					</div>
					<img src={shop} className="Shop__main__image"></img>
				</div>
			</section>
			<ShopPopularity/>
			<div className="Appraisal__division__line"></div>
		</div>
	);
}

export default withRouter(Shop);
