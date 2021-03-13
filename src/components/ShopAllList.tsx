import React, { useState } from "react";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import "../styles/ShopAllLists.css";
import FavoriteIcon from "@material-ui/icons/Favorite";

type CategoryTitleProps = {
	categoryTitle: string;
	shopList: any;
};

function ShopAllList({ categoryTitle, shopList }: CategoryTitleProps) {
	const [count, setCount] = useState<number>(8);

	const moreButtonClick = (): void => {
		setCount((count) => count + 8);
	};

	return (
		<section className="shopAllList">
			<div className="shopAllList__title__wrap">
				<div className="shopAllList__title">{`${categoryTitle} 리스트`}</div>
			</div>
			<div className="shopAllList__container">
				{shopList
					.map((shopList: any) => (
						<div className="shopAllList__container__card" key={shopList.id}>
							<Link to={`/shop/${shopList.id}`} key={shopList.id}>
								<img
									alt={"이미지"}
									className="shopAllList__container__img"
									src={shopList.imgUrl}
								></img>
								<div className="shopAllList__container__wrap">
									<div className="shopAllList_-container__nickAndLikeWrap">
										<div className="shopAllList__container__nick">
											{shopList.nickname}
										</div>
										<span className="shopAllList__container__like">
											<FavoriteIcon fontSize="inherit" />
										</span>
									</div>
									<div className="shopAllList__container__titleAndLikeCount">
										<div className="shopAllList__container__title">
											{shopList.itemName}
										</div>
										<span className="shopAllList__container__likeCount">
											{shopList.likeCount}
										</span>
									</div>
									<div className="shopAllList__container__price">
										<span className="shopAllList__container__price">
											판매가{" "}
										</span>
										{!shopList
											? null
											: shopList.userPrice
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
										원{" "}
									</div>
								</div>
							</Link>
						</div>
					))
					.reverse()
					.slice(0, count)}
			</div>
			<div className="shopAllList__container__moreButton">
				<KeyboardArrowDownIcon fontSize="inherit" onClick={moreButtonClick} />
			</div>
		</section>
	);
}

export default ShopAllList;
