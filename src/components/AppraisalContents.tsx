import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "../styles/AppraisalContents.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import CloseIcon from "@material-ui/icons/Close";
function AppraisalContents() {
	const initialState = [
		{
			id: 1,
			nick: "제킴",
			name: "잠자는 나비",
			price: 120000,
			category: "도저히 분류할 수 없는",
		},
		{
			id: 2,
			nick: "제킴",
			name: "잠자는 나비",
			price: 120000,
			category: "음식",
		},
		{
			id: 3,
			nick: "제킴",
			name: "잠자는 나비",
			price: 120000,
			category: "음식",
		},
		{
			id: 4,
			nick: "제킴",
			name: "잠자는 나비",
			price: 120000,
			category: "음식",
		},
	];

	const [like, setLike] = useState<boolean>(false);
	const [count, setCount] = useState<number>(1);
	const [apprasialState, setApprasialState] = useState<boolean>(false);
	const [price, setPrice] = useState<number>(0);
	const [userInfo, setUserInfo] = useState<string>("");
	const [isUser, setIsUser] = useState<boolean>(false);

	useEffect(() => {
		changeRight();
		changeLikeButton();
		isUserController();
	});

	const likeButtonClick = (): void => {
		setLike(!like);
	};

	const changeLikeButton = (): void => {
		if (like === true) {
			const likeButton = document.querySelector(
				`.AppraisalContents__body__likebutton`,
			) as HTMLElement;
			likeButton.classList.add("like");
		}

		if (like === false) {
			const likeButton = document.querySelector(
				`.AppraisalContents__body__likebutton.like`,
			) as HTMLElement;
			if (likeButton == null) {
				return;
			}
			likeButton.classList.remove("like");
		}
	};

	const rightPhotoButton = (): void => {
		if (count >= initialState.length) {
			setCount((count) => initialState.length);
			return;
		}
		setCount((count) => count + 1);
		changeLeft();
	};

	const leftPhotoButton = (): void => {
		if (count <= 1 || count === 0) {
			setCount((count) => 1);
			return;
		}
		setCount((count) => count - 1);
		changeRight();
	};

	const changeLeft = (): void => {
		const next = document.querySelector(
			`.AppraisalContainer__imgContainer__big${count}`,
		) as HTMLElement;
		const nextsmall = document.querySelector(
			`.AppraisalContainer__imgContainer__smallWrap__small${count}`,
		) as HTMLElement;
		nextsmall.classList.remove("backsmall");
		nextsmall.classList.add("gosmall");
		next.classList.remove("back");
		next.classList.add("go");
	};

	const changeRight = (): void => {
		const next = document.querySelector(
			`.AppraisalContainer__imgContainer__big${count}`,
		) as HTMLElement;
		const nextsmall = document.querySelector(
			`.AppraisalContainer__imgContainer__smallWrap__small${count}`,
		) as HTMLElement;

		nextsmall.classList.remove("gosmall");
		nextsmall.classList.add("backsmall");
		next.classList.remove("go");
		next.classList.add("back");

		const nextsmall2 = document.querySelector(
			`.AppraisalContainer__imgContainer__smallWrap__small${count + 1}`,
		) as HTMLElement;
		if (nextsmall2 == null) {
			return;
		}
		nextsmall2.classList.remove("backsmall");
		nextsmall2.classList.add("gosmall");
	};

	const appraisalButton = (): void => {
		setApprasialState(!apprasialState);
	};

	const changePrice = (e: any) => {
		setPrice(e.target.value);
	};

	const submitPrice = () => {
		setApprasialState(!apprasialState);
	};

	const isUserController = () => {
		initialState.map((content) => {
			if (content.nick === userInfo) {
				setIsUser(true);
			} else {
				setIsUser(false);
			}
		});
	};

	return (
		<section className="AppraisalContents">
			<div className="AppraisalContainer">
				<div className="AppraisalContainer__imgContainer">
					<div className="AppraisalContainer__imgContainer__bigWrap">
						{initialState.map((content: any) => {
							let name = `AppraisalContainer__imgContainer__big${content.id}`;
							return <div className={name} key={content.id}></div>;
						})}
					</div>
					<div className="AppraisalContainer__imgContainer__smallWrap">
						<button className="AppraisalContainer__imgContainer__smallWrap__leftButton">
							<KeyboardArrowLeftIcon
								fontSize="inherit"
								onClick={leftPhotoButton}
							/>
						</button>
						{initialState.map((content: any) => {
							let name = `AppraisalContainer__imgContainer__smallWrap__small${content.id}`;
							return <div className={name} key={content.id}></div>;
						})}
						<button
							className="AppraisalContainer__imgContainer__smallWrap__rightButton"
							onClick={rightPhotoButton}
						>
							<KeyboardArrowRightIcon fontSize="inherit" />
						</button>
					</div>
				</div>
				{initialState.slice(0, 1).map((content: any) => (
					<div className="AppraisalContainer__wrap" key={content.id}>
						<div className="AppraisalContainer__title">{content.nick}</div>

						<div className="AppraisalContainer__nameAndLike">
							<div className="AppraisalContainer__name">{content.name}</div>
							<div className="AppraisalContainer__likeAndCount">
								{like ? (
									<button
										className="AppraisalContainer__like"
										onClick={likeButtonClick}
									>
										<FavoriteIcon fontSize="inherit" />
									</button>
								) : (
									<button
										className="AppraisalContainer__unlike"
										onClick={likeButtonClick}
									>
										<FavoriteBorderIcon fontSize="inherit" />
									</button>
								)}
								<span className="AppraisalContainer__likeCount">123</span>
							</div>
						</div>
						<div className="AppraisalContainer__category">
							# {content.category}
						</div>
						<div className="AppraisalContainer__divideLine"></div>
						<div className="AppraisalContainer__text">
							<div className="AppraisalContainer__left">
								<div className="AppraisalContainer__price">평균 감정가</div>
								<div className="AppraisalContainer__priceNumber">참여 인원</div>
							</div>
							<div className="AppraisalContainer__right">
								<div className="AppraisalContainer__priceText">
									₩{" "}
									{content.price
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
								</div>
								<div className="AppraisalContainer__priceNumberText">
									102 명
								</div>
							</div>
						</div>
						<div className="AppraisalContainer__divideLine"></div>
						<div className="AppraisalContents__body">
							잠자는 나비 포즈 실화냐? <br />
							너무 커엽다 가슴이 웅장해진다..
							<br /> 진짜 나비는 전설이다
							<br /> 이 정도 나비면 국대 원탑 급 고양이다 ㅇㅈ?
						</div>
						<div className="AppraisalContainer__divideLine"></div>

						{isUser ? (
							<div className="AppraisalContents__body__buttonWrap">
								<button
									className="AppraisalContents__body__submitButton"
									onClick={likeButtonClick}
								>
									수정
								</button>
								<button
									className="AppraisalContents__body__deleteButton"
									onClick={appraisalButton}
								>
									삭제
								</button>
							</div>
						) : (
							<div className="AppraisalContents__body__buttonWrap">
								<button
									className="AppraisalContents__body__likebutton"
									onClick={likeButtonClick}
								>
									좋아요
								</button>
								<button
									className="AppraisalContents__body__button"
									onClick={appraisalButton}
								>
									감정하기
								</button>
							</div>
						)}
					</div>
				))}
			</div>
			{apprasialState ? (
				<div className="AppraisalContents__inputModal">
					<button
						className="AppraisalContents__inputModal__close"
						onClick={appraisalButton}
					>
						<CloseIcon fontSize="inherit" />
					</button>
					<div className="AppraisalContents__inputWrap">
						<div className="AppraisalContents__input__title">
							당신의 감정가는?
						</div>
						<input
							className="AppraisalContents__input"
							onChange={changePrice}
						></input>
						<span className="AppraisalContents__input__text">원</span>
						<button
							className="AppraisalContents__input__button"
							onClick={submitPrice}
						>
							{" "}
							감정{" "}
						</button>
					</div>
				</div>
			) : null}
		</section>
	);
}

export default withRouter(AppraisalContents);
