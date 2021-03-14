import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import "../styles/AppraisalPopularity.css";
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
function AppraisalPopularity() {
	const [appraisalList, setAppraisalList] = useState<List[]>([]);
	useEffect(() => {
		axios
			.get(`/api/appraisal`)
			.then((res) => {
				const LikeCount = res.data.sort(function (a: any, b: any) {
					return a.likeCount < b.likeCount ? 1 : -1;
				});
				setAppraisalList(LikeCount);
			})
			.catch((err) => alert(err));
	}, []);

	const rightButtonclick = (): void => {
		const next = document.querySelector(
			".appraisal__popularity__right",
		) as HTMLElement;
		const before = document.querySelector(
			".appraisal__popularity",
		) as HTMLElement;
		const buttonLeft = document.querySelector(
			".appraisal__nextButton2__leftdot",
		) as HTMLElement;
		const buttonRight = document.querySelector(
			".appraisal__nextButton2__rightdot",
		) as HTMLElement;

		if (
			next == null ||
			before == null ||
			buttonLeft == null ||
			buttonRight == null
		) {
			return;
		}
		next.className = "appraisal__popularity__right__move";
		before.className = "appraisal__popularity__left__move";
		buttonLeft.className = "appraisal__nextButton2__rightdot";
		buttonRight.className = "appraisal__nextButton2__leftdot";
	};

	const leftButtonclick = (): void => {
		const next = document.querySelector(
			".appraisal__popularity__right__move",
		) as HTMLElement;
		const before = document.querySelector(
			".appraisal__popularity__left__move",
		) as HTMLElement;
		const buttonLeft = document.querySelector(
			".appraisal__nextButton2__leftdot",
		) as HTMLElement;
		const buttonRight = document.querySelector(
			".appraisal__nextButton2__rightdot",
		) as HTMLElement;
		if (
			next == null ||
			before == null ||
			buttonLeft == null ||
			buttonRight == null
		) {
			return;
		}
		next.className = "appraisal__popularity__right";
		before.className = "appraisal__popularity";
		buttonLeft.className = "appraisal__nextButton2__rightdot";
		buttonRight.className = "appraisal__nextButton2__leftdot";
	};

	return (
		<section className="appraisal">
			<div className="appraisal__title__wrap">
				<div className="appraisal__title">인기 높은 리스트</div>
				<Link to={`/list/appraisal`}>
					<div className="appraisal__title__button">리스트 더보기</div>
				</Link>
			</div>
			<div className="appraisal__popularity">
				{appraisalList.slice(0, 8).map((appraisalList) => (
					<div className="appraisal__popularity__card" key={appraisalList.id}>
						<Link to={`/appraisal/${appraisalList.id}`} key={appraisalList.id}>
							<img
								alt={"이미지"}
								src={appraisalList.imgUrl}
								className="appraisal__highPriceList__img"
							></img>
							<div className="appraisal__popularity__card__wrap">
								<div className="appraisal__popularity__nickAndLikeWrap">
									<div className="appraisal__popularity__nick">
										{appraisalList.nickname}
									</div>
									<span className="appraisal__popularity__like">
										<FavoriteIcon fontSize="inherit" />
									</span>
								</div>
								<div className="appraisal__popularity__titleAndLikeCount">
									<div className="appraisal__popularity__title">
										{appraisalList.itemName}
									</div>
									<span className="appraisal__popularity__likeCount">
										{appraisalList.likeCount}
									</span>
								</div>
								<span className="appraisal__popularity__price">
									<span className="appraisal__popularity__price">감정가 </span>
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
			<div className="appraisal__popularity__right">
				{appraisalList.slice(8, 16).map((appraisalList) => (
					<div className="appraisal__popularity__card" key={appraisalList.id}>
						<Link to={`/appraisal/${appraisalList.id}`} key={appraisalList.id}>
							<img
								alt={"이미지"}
								src={appraisalList.imgUrl}
								className="appraisal__highPriceList__img"
							></img>
							<div className="appraisal__popularity__card__wrap">
								<div className="appraisal__popularity__nickAndLikeWrap">
									<div className="appraisal__popularity__nick">
										{appraisalList.nickname}
									</div>
									<span className="appraisal__popularity__like">
										<FavoriteIcon fontSize="inherit" />
									</span>
								</div>
								<div className="appraisal__popularity__titleAndLikeCount">
									<div className="appraisal__popularity__title">
										{appraisalList.itemName}
									</div>
									<span className="appraisal__popularity__likeCount">
										{appraisalList.likeCount}
									</span>
								</div>
								<span className="appraisal__popularity__price">
									<span className="appraisal__popularity__price">감정가 </span>
									{appraisalList.average} 원{" "}
								</span>
							</div>
						</Link>
					</div>
				))}
			</div>
			<div className="appraisal__nextButton__container">
				<button className="appraisal__nextButton2" onClick={leftButtonclick}>
					<KeyboardArrowLeftIcon fontSize="inherit" />
				</button>
				<button
					className="appraisal__nextButton2__leftdot"
					onClick={leftButtonclick}
				>
					<FiberManualRecordIcon fontSize="inherit" />
				</button>
				<button
					className="appraisal__nextButton2__rightdot"
					onClick={rightButtonclick}
				>
					<FiberManualRecordIcon fontSize="inherit" />
				</button>
				<button className="appraisal__nextButton2" onClick={rightButtonclick}>
					<KeyboardArrowRightIcon fontSize="inherit" />
				</button>
			</div>
		</section>
	);
}

export default withRouter(AppraisalPopularity);
