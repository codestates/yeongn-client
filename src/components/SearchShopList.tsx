import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import axios from "axios";
interface MatchParams {
	word: string;
}

function SearchshopList({ word }: MatchParams) {
	const [shopState, setshopState] = useState<any>();
	const [count, setCount] = useState<any>();
	useEffect(() => {
		axios.get(`https://www.yeongn.com/api/search/${word}`).then((res) => {
			setshopState(res.data.sales);
		});
	}, []);

	const countPlus = () => {
		setCount(+1);
	};

	return (
		<section className="shopAllList">
			<div className="shopAllList__title__wrap">
				<div className="shopAllList__title">상점 검색 결과</div>
			</div>
			<div className="shopAllList__container">
				{!shopState || shopState.length === 0 ? (
					<div className="noSearchData">이런.. 찾으시는 물품이 없네요...</div>
				) : (
					shopState.map((shopList: any) => (
						<div className="shopAllList__container__card" key={shopList.id}>
							<Link to={`/shop/${shopList.id}`} key={shopList.id}>
								<img
									alt={"이미지"}
									src={shopList.imgUrl}
									className="shop__popularity__img"
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
											{" "}
											{shopList.likeCount}
										</span>
									</div>
									<div className="shopAllList__container__price">
										<span className="shopAllList__container__price">
											<span className="shop__popularity__price">판매가 </span>
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
				)}
			</div>
		</section>
	);
}

export default SearchshopList;
