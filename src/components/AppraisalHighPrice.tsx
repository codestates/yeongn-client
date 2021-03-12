import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import "../styles/AppraisalHighPrice.css";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
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
function AppraisalHighPrice() {
	const [appraisalList, setAppraisalList] = useState<List[]>([]);

	useEffect(() => {
		axios
			.get(`https://www.yeongn.com/api/appraisal`)
			.then((res) => {
				const highPriceData = res.data.sort(function (a: any, b: any) {
					return a.average < b.average ? 1 : -1;
				});
				setAppraisalList(highPriceData);
			})
			.catch((err) => console.log(err));
	}, []);

	const rightButtonclick = (): void => {
		const next = document.querySelector(
			".appraisal__highPriceList__right",
		) as HTMLElement;
		const before = document.querySelector(
			".appraisal__highPriceList",
		) as HTMLElement;
		const buttonLeft = document.querySelector(
			".appraisal__nextButton__leftdot",
		) as HTMLElement;
		const buttonRight = document.querySelector(
			".appraisal__nextButton__rightdot",
		) as HTMLElement;
		if (
			next == null ||
			before == null ||
			buttonLeft == null ||
			buttonRight == null
		) {
			return;
		}
		next.className = "appraisal__highPriceList__right__move";
		before.className = "appraisal__highPriceList__left__move";
		buttonLeft.className = "appraisal__nextButton__rightdot";
		buttonRight.className = "appraisal__nextButton__leftdot";
	};
	const leftButtonclick = (): void => {
		const next = document.querySelector(
			".appraisal__highPriceList__right__move",
		) as HTMLElement;
		const before = document.querySelector(
			".appraisal__highPriceList__left__move",
		) as HTMLElement;
		const buttonLeft = document.querySelector(
			".appraisal__nextButton__leftdot",
		) as HTMLElement;
		const buttonRight = document.querySelector(
			".appraisal__nextButton__rightdot",
		) as HTMLElement;
		if (
			next == null ||
			before == null ||
			buttonLeft == null ||
			buttonRight == null
		) {
			return;
		}
		next.className = "appraisal__highPriceList__right";
		before.className = "appraisal__highPriceList";
		buttonLeft.className = "appraisal__nextButton__rightdot";
		buttonRight.className = "appraisal__nextButton__leftdot";
	};

	return (
		<section className="appraisal">
			<div className="appraisal__title__wrap">
				<div className="appraisal__title">높은 감정가 리스트</div>
				<Link to={`/list/appraisal`}>
					<div className="appraisal__title__button">리스트 더보기</div>
				</Link>
			</div>
			<div className="appraisal__highPriceList">
				{!appraisalList
					? null
					: appraisalList.slice(0, 8).map((appraisalList) => (
							<div
								className="appraisal__highPriceList__card"
								key={appraisalList.id}
							>
								<Link
									to={`/appraisal/${appraisalList.id}`}
									key={appraisalList.id}
								>
									<img
										alt={"이미지"}
										src={appraisalList.imgUrl}
										className="appraisal__highPriceList__img"
									></img>
									<div className="appraisal__highPriceList__card__wrap">
										<div className="appraisal__highPriceList__nickAndLikeWrap">
											<div className="appraisal__highPriceList__nick">
												{appraisalList.nickname}
											</div>
											<span className="appraisal__highPriceList__like">
												<FavoriteIcon fontSize="inherit" />
											</span>
										</div>
										<div className="appraisal__highPriceList__titleAndLikeCount">
											<div className="appraisal__highPriceList__title">
												{appraisalList.itemName}
											</div>
											<span className="appraisal__highPriceList__likeCount">
												{appraisalList.likeCount}
											</span>
										</div>
										<span className="appraisal__highPriceList__price">
											<span className="appraisal__highPriceList__price">
												감정가{" "}
											</span>
											{!appraisalList
												? null
												: appraisalList.average
														.toString()
														.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
											원
										</span>
									</div>
								</Link>
							</div>
					  ))}
			</div>
			<div className="appraisal__highPriceList__right">
				{!appraisalList
					? null
					: appraisalList.slice(8, 16).map((appraisalList) => (
							<div
								className="appraisal__highPriceList__card"
								key={appraisalList.id}
							>
								<Link
									to={`/appraisal/${appraisalList.id}`}
									key={appraisalList.id}
								>
									<img
										alt={"이미지"}
										src={appraisalList.imgUrl}
										className="appraisal__highPriceList__img"
									></img>
									<div className="appraisal__highPriceList__card__wrap">
										<div className="appraisal__highPriceList__nickAndLikeWrap">
											<div className="appraisal__highPriceList__nick">
												{appraisalList.nickname}
											</div>
											<span className="appraisal__highPriceList__like">
												<FavoriteIcon fontSize="inherit" />
											</span>
										</div>
										<div className="appraisal__highPriceList__titleAndLikeCount">
											<div className="appraisal__highPriceList__title">
												{appraisalList.itemName}
											</div>
											<span className="appraisal__highPriceList__likeCount">
												{appraisalList.likeCount}
											</span>
										</div>
										<span className="appraisal__highPriceList__price">
											<span className="appraisal__highPriceList__price">
												감정가{" "}
											</span>
											{!appraisalList
												? null
												: appraisalList.average
														.toString()
														.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
											원
										</span>
									</div>
								</Link>
							</div>
					  ))}
			</div>
			<div className="appraisal__nextButton__container">
				<button className="appraisal__nextButton" onClick={leftButtonclick}>
					<KeyboardArrowLeftIcon fontSize="inherit" />
				</button>
				<button
					className="appraisal__nextButton__leftdot"
					onClick={leftButtonclick}
				>
					<FiberManualRecordIcon fontSize="inherit" />
				</button>
				<button
					className="appraisal__nextButton__rightdot"
					onClick={rightButtonclick}
				>
					<FiberManualRecordIcon fontSize="inherit" />
				</button>
				<button className="appraisal__nextButton" onClick={rightButtonclick}>
					<KeyboardArrowRightIcon fontSize="inherit" />
				</button>
			</div>
		</section>
	);
}

export default withRouter(AppraisalHighPrice);
