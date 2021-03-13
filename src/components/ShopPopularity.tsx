import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import "../styles/ShopPopularity.css";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import FavoriteIcon from "@material-ui/icons/Favorite";

function ShopPopularity() {
	const [shopList, setShopList] = useState<any>([]);

	useEffect(() => {
		axios
			.get(`https://www.yeongn.com/api/shop`)
			.then((res) => {
				const LikeCount = res.data.sort(function (a: any, b: any) {
					return a.likeCount < b.likeCount ? 1 : -1;
				});
				setShopList(LikeCount);
			})
			.catch((err) => alert(err));
	}, []);

	const rightButtonclick = (): void => {
		const next = document.querySelector(
			".shop__popularity__right",
		) as HTMLElement;
		const before = document.querySelector(".shop__popularity") as HTMLElement;
		const buttonLeft = document.querySelector(
			".shop__nextButton__leftdot",
		) as HTMLElement;
		const buttonRight = document.querySelector(
			".shop__nextButton__rightdot",
		) as HTMLElement;

		if (
			next == null ||
			before == null ||
			buttonLeft == null ||
			buttonRight == null
		) {
			return;
		}
		next.className = "shop__popularity__right__move";
		before.className = "shop__popularity__left__move";
		buttonLeft.className = "shop__nextButton__rightdot";
		buttonRight.className = "shop__nextButton__leftdot";
	};

	const leftButtonclick = (): void => {
		const next = document.querySelector(
			".shop__popularity__right__move",
		) as HTMLElement;
		const before = document.querySelector(
			".shop__popularity__left__move",
		) as HTMLElement;
		const buttonLeft = document.querySelector(
			".shop__nextButton__leftdot",
		) as HTMLElement;
		const buttonRight = document.querySelector(
			".shop__nextButton__rightdot",
		) as HTMLElement;
		if (
			next == null ||
			before == null ||
			buttonLeft == null ||
			buttonRight == null
		) {
			return;
		}
		next.className = "shop__popularity__right";
		before.className = "shop__popularity";
		buttonLeft.className = "shop__nextButton__rightdot";
		buttonRight.className = "shop__nextButton__leftdot";
	};

	return (
		<section className="shop">
			<div className="shop__title__wrap">
				<div className="shop__title">인기 높은 리스트</div>
				<Link to={`/list/shop`}>
					<div className="shop__title__button">리스트 더보기</div>
				</Link>
			</div>
			<div className="shop__popularity">
				{shopList.slice(0, 8).map((shopList: any) => (
					<div className="shop__popularity__card" key={shopList.id}>
						<Link to={`/shop/${shopList.id}`} key={shopList.id}>
							<img
								src={shopList.imgUrl}
								className="shop__popularity__img"
							></img>
							<div className="shop__popularity__card__wrap">
								<div className="shop__popularity__nickAndLikeWrap">
									<div className="shop__popularity__nick">
										{shopList.nickname}
									</div>
									<span className="shop__popularity__like">
										<FavoriteIcon fontSize="inherit" />
									</span>
								</div>
								<div className="shop__popularity__titleAndLikeCount">
									<div className="shop__popularity__title">
										{shopList.itemName}
									</div>
									<span className="shop__popularity__likeCount">
										{shopList.likeCount}
									</span>
								</div>
								<span className="shop__popularity__price">
									<span className="shop__popularity__price">판매가 </span>
									{!shopList
										? null
										: shopList.userPrice
												.toString()
												.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
									원{" "}
								</span>
							</div>
						</Link>
					</div>
				))}
			</div>
			<div className="shop__popularity__right">
				{shopList.slice(8, 16).map((shopList: any) => (
					<div className="shop__popularity__card" key={shopList.id}>
						<Link to={`/shop/${shopList.id}`} key={shopList.id}>
							<img
								alt={"이미지"}
								src={shopList.imgUrl}
								className="shop__popularity__img"
							></img>
							<div className="shop__popularity__card__wrap">
								<div className="shop__popularity__nickAndLikeWrap">
									<div className="shop__popularity__nick">
										{shopList.nickname}
									</div>
									<span className="shop__popularity__like">
										<FavoriteIcon fontSize="inherit" />
									</span>
								</div>
								<div className="shop__popularity__titleAndLikeCount">
									<div className="shop__popularity__title">
										{shopList.itemName}
									</div>
									<span className="shop__popularity__likeCount">
										{" "}
										{shopList.likeCount}
									</span>
								</div>
								<span className="shop__popularity__price">
									<span className="shop__popularity__price">판매가 </span>
									{!shopList
										? null
										: shopList.userPrice
												.toString()
												.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
									원{" "}
								</span>
							</div>
						</Link>
					</div>
				))}
			</div>
			<div className="shop__nextButton__container">
				<button className="shop__nextButton" onClick={leftButtonclick}>
					<KeyboardArrowLeftIcon fontSize="inherit" />
				</button>
				<button className="shop__nextButton__leftdot" onClick={leftButtonclick}>
					<FiberManualRecordIcon fontSize="inherit" />
				</button>
				<button
					className="shop__nextButton__rightdot"
					onClick={rightButtonclick}
				>
					<FiberManualRecordIcon fontSize="inherit" />
				</button>
				<button className="shop__nextButton" onClick={rightButtonclick}>
					<KeyboardArrowRightIcon fontSize="inherit" />
				</button>
			</div>
		</section>
	);
}

export default withRouter(ShopPopularity);
