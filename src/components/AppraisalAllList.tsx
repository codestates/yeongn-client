import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/AppraisalAllLists.css";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import FavoriteIcon from "@material-ui/icons/Favorite";

interface List {
	average: number;
	category: string;
	createdAt: string;
	description: string;
	id: number;
	imgUrl: string;
	itemName: string;
	likeCount: number;
	nickname: string;
	userId: number;
	userPrice: string;
	usersAppraisalsPrices: {};
}

type CategoryTitleProps = {
	categoryTitle: string;
	appraisalList: List[];
};

function AppraisalAllList({
	categoryTitle,
	appraisalList,
}: CategoryTitleProps) {
	const [count, setCount] = useState<number>(8);

	const moreButtonClick = (): void => {
		setCount((count) => count + 8);
	};

	return (
		<section className="appraisalAllList">
			<div className="appraisalAllList__title__wrap">
				<div className="appraisalAllList__title">{`${categoryTitle} 리스트`}</div>
			</div>
			<div className="appraisalAllList__container">
				{!appraisalList
					? null
					: appraisalList
							.map((appraisalList) => (
								<div
									className="appraisalAllList__container__card"
									key={appraisalList.id}
								>
									<Link
										to={`/appraisal/${appraisalList.id}`}
										key={appraisalList.id}
									>
										<img
											alt="이미지"
											src={appraisalList.imgUrl}
											className="appraisalAllList__container__img"
										></img>
										<div className="appraisalAllList__container__wrap">
											<div className="appraisalAllList_-container__nickAndLikeWrap">
												<div className="appraisalAllList__container__nick">
													{appraisalList.nickname}
												</div>
												<span className="appraisalAllList__container__like">
													<FavoriteIcon fontSize="inherit" />
												</span>
											</div>
											<div className="appraisalAllList__container__titleAndLikeCount">
												<div className="appraisalAllList__container__title">
													{appraisalList.itemName}
												</div>
												<span className="appraisalAllList__container__likeCount">
													{appraisalList.likeCount}
												</span>
											</div>
											<div className="appraisalAllList__container__price">
												<span className="appraisalAllList__container__price">
													감정가{" "}
												</span>
												{!appraisalList
													? null
													: appraisalList.average
															.toString()
															.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
												원
											</div>
										</div>
									</Link>
								</div>
							))
							.reverse()
							.slice(0, count)}
			</div>
			<div className="appraisalAllList__container__moreButton">
				<KeyboardArrowDownIcon fontSize="inherit" onClick={moreButtonClick} />
			</div>
		</section>
	);
}

export default AppraisalAllList;
