import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import "../styles/AppraisalAllLists.css";
import FavoriteIcon from "@material-ui/icons/Favorite";



type CategoryTitleProps = {
	categoryTitle: string;
	initialState: any;
};

function AppraisalAllList({ categoryTitle, initialState }: CategoryTitleProps) {
	const [count, setCount] = useState<number>(9);
	const [appraisalList, setAppraisalList] = useState(initialState);
	const [category, setCategory] = useState(categoryTitle);

	useEffect(() => {
		filterCategory(categoryTitle);
		setCategory(categoryTitle);
	});

	const filterCategory = (categoryTitle: string): void => {
		if (categoryTitle === "전체" || categoryTitle === "전체 감정가") {
			setAppraisalList(initialState);
		} else if (categoryTitle === "높은 가격") {
			const highPriceData = appraisalList.sort(function (a: any, b: any) {
				return a.price < b.price ? 1 : -1;
			});
			setAppraisalList(highPriceData);
		} else if (categoryTitle === "낮은 가격") {
			const highPriceData = appraisalList.sort(function (a: any, b: any) {
				return a.price > b.price ? 1 : -1;
			});
			setAppraisalList(highPriceData);
		} else {
			setAppraisalList(
				appraisalList.filter((el: any) => el.category === categoryTitle),
			);
		}
	};

	const moreButtonClick = (): void => {
		setCount((count) => count + 6);
	};

	return (
		<section className="appraisalAllList">
			<div className="appraisalAllList__title__wrap">
				<div className="appraisalAllList__title">{`${categoryTitle} 리스트`}</div>
			</div>
			<div className="appraisalAllList__container">
				{appraisalList.slice(0, count).map((appraisalList: any) => (
					<div
						className="appraisalAllList__container__card"
						key={appraisalList.id}
					>
						<Link to={`/appraisal/${appraisalList.id}`} key={appraisalList.id}>
							<div className="appraisalAllList__container__img"></div>
							<div className="appraisalAllList__container__wrap">
								<div className="appraisalAllList_-container__nickAndLikeWrap">
									<div className="appraisalAllList__container__nick">
										{appraisalList.nick}
									</div>
									<span className="appraisalAllList__container__like">
										<FavoriteIcon fontSize="inherit" />
									</span>
								</div>
								<div className="appraisalAllList__container__titleAndLikeCount">
									<div className="appraisalAllList__container__title">
										{appraisalList.name}
									</div>
									<span className="appraisalAllList__container__likeCount">
										147
									</span>
								</div>
								<div className="appraisalAllList__container__price">
									<span className="appraisalAllList__container__price">
										감정가{" "}
									</span>
									{appraisalList.price
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
									원{" "}
								</div>
							</div>
						</Link>
					</div>
				))}
			</div>
			<div className="appraisalAllList__container__moreButton">
				<KeyboardArrowDownIcon fontSize="inherit" onClick={moreButtonClick} />
			</div>
		</section>
	);
}

export default AppraisalAllList;
