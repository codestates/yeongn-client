import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import "../styles/AppraisalHighPrice.css";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Loading from "../components/Loading";
const initialState = [
	{
		id: 1,
		name: "노른자 분리기",
		price: 9900,
		category: "장난감",
		nick: "제킴",
	},
	{
		id: 2,
		name: "우리 엄마 김치",
		price: 12000,
		category: "음식",
		nick: "제킴",
	},
	{
		id: 3,
		name: "건담",
		price: 290000,
		category: "피규어",
		nick: "코공",
	},
	{
		id: 4,
		name: "뜯어온 보도블럭",
		price: 4900000,
		category: "줘도 안 가지는",
		nick: "코공",
	},
	{
		id: 5,
		name: "칼라 립스틱",
		price: 29000000,
		category: "화장품",
		nick: "빵맨",
	},
	{
		id: 6,
		name: "잉어 슈즈",
		price: 39000000,
		category: "의류",
		nick: "빵맨",
	},
	{
		id: 7,
		name: "웰컴 매트",
		price: 690000000,
		category: "도저히 분류하기 힘든",
		nick: "지땅",
	},
	{
		id: 8,
		name: "멋진 의자",
		price: 9900,
		category: "가구",
		nick: "지땅",
	},
	{
		id: 9,
		name: "카스",
		price: 991200,
		category: "맥주",
		nick: "제킴",
	},
	{
		id: 10,
		name: "갤럭시 노트 10+",
		price: 12200,
		category: "전자기기",
		nick: "코공",
	},
	{
		id: 11,
		name: "내가 만든 꽃",
		price: 200,
		category: "꽃",
		nick: "빵맨",
	},
	{
		id: 12,
		name: "책1",
		price: 991200,
		category: "책",
		nick: "지땅",
	},
	{
		id: 13,
		name: "코공",
		price: 9922312300,
		category: "도저히 분류하기 힘든",
		nick: "지땅",
	},
	{
		id: 14,
		name: "코공",
		price: 9922312300,
		category: "도저히 분류하기 힘든",
		nick: "지땅",
	},
	{
		id: 15,
		name: "코공",
		price: 9922312300,
		category: "도저히 분류하기 힘든",
		nick: "지땅",
	},
	{
		id: 16,
		name: "코공",
		price: 9922312300,
		category: "도저히 분류하기 힘든",
		nick: "지땅",
	},
];

function AppraisalHighPrice() {
	const [appraisalList, setAppraisalList] = useState(initialState);

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
				{appraisalList.slice(0, 8).map((appraisalList) => (
					<div
						className="appraisal__highPriceList__card"
						key={appraisalList.id}
					>
						<Link to={`/appraisal/${appraisalList.id}`} key={appraisalList.id}>
							<div className="appraisal__highPriceList__img"></div>
							<div className="appraisal__highPriceList__card__wrap">
								<div className="appraisal__highPriceList__nickAndLikeWrap">
									<div className="appraisal__highPriceList__nick">
										{appraisalList.nick}
									</div>
									<span className="appraisal__highPriceList__like">
										<FavoriteIcon fontSize="inherit" />
									</span>
								</div>
								<div className="appraisal__highPriceList__titleAndLikeCount">
									<div className="appraisal__highPriceList__title">
										{appraisalList.name}
									</div>
									<span className="appraisal__highPriceList__likeCount">
										147
									</span>
								</div>
								<span className="appraisal__highPriceList__price">
									<span className="appraisal__highPriceList__price">
										감정가{" "}
									</span>
									{appraisalList.price
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
									원{" "}
								</span>
							</div>
						</Link>
					</div>
				))}
			</div>
			<div className="appraisal__highPriceList__right">
				{appraisalList.slice(8, 16).map((appraisalList) => (
					<div
						className="appraisal__highPriceList__card"
						key={appraisalList.id}
					>
						<Link to={`/appraisal/${appraisalList.id}`} key={appraisalList.id}>
							<div className="appraisal__highPriceList__img"></div>
							<div className="appraisal__highPriceList__card__wrap">
								<div className="appraisal__highPriceList__nickAndLikeWrap">
									<div className="appraisal__highPriceList__nick">
										{appraisalList.nick}
									</div>
									<span className="appraisal__highPriceList__like">
										<FavoriteIcon fontSize="inherit" />
									</span>
								</div>
								<div className="appraisal__highPriceList__titleAndLikeCount">
									<div className="appraisal__highPriceList__title">
										{appraisalList.name}
									</div>
									<span className="appraisal__highPriceList__likeCount">
										147
									</span>
								</div>
								<span className="appraisal__highPriceList__price">
									<span className="appraisal__highPriceList__price">
										감정가{" "}
									</span>
									{appraisalList.price
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
									원{" "}
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
