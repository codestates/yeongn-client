import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "../styles/ShopContents.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import CloseIcon from "@material-ui/icons/Close";

function ShopContents() {
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
		// changeRight();
		changeLikeButton();
		isUserController();
	});

	const likeButtonClick = (): void => {
		setLike(!like);
	};
	const changeLikeButton = (): void => {
		if (like === true) {
			const likeButton = document.querySelector(
				`.ShopContents__body__likebutton`,
			) as HTMLElement;
			likeButton.classList.add("like");
		}

		if (like === false) {
			const likeButton = document.querySelector(
				`.ShopContents__body__likebutton.like`,
			) as HTMLElement;
			if (likeButton == null) {
				return;
			}
			likeButton.classList.remove("like");
		}
	};

	// const rightPhotoButton = (): void => {
	// 	if (count >= initialState.length) {
	// 		setCount((count) => initialState.length);
	// 		return;
	// 	}
	// 	setCount((count) => count + 1);
	// 	changeLeft();
	// };
	// const leftPhotoButton = (): void => {
	// 	if (count <= 1 || count === 0) {
	// 		setCount((count) => 1);
	// 		return;
	// 	}
	// 	setCount((count) => count - 1);
	// 	changeRight();
	// };

	// const changeLeft = (): void => {
	// 	const next = document.querySelector(
	// 		`.ShopContainer__imgContainer__big${count}`,
	// 	) as HTMLElement;
	// 	const nextsmall = document.querySelector(
	// 		`.ShopContainer__imgContainer__smallWrap__small${count}`,
	// 	) as HTMLElement;
	// 	nextsmall.classList.remove("backsmall");
	// 	nextsmall.classList.add("gosmall");
	// 	next.classList.remove("back");
	// 	next.classList.add("go");
	// };

	// const changeRight = (): void => {
	// 	const next = document.querySelector(
	// 		`.ShopContainer__imgContainer__big${count}`,
	// 	) as HTMLElement;
	// 	const nextsmall = document.querySelector(
	// 		`.ShopContainer__imgContainer__smallWrap__small${count}`,
	// 	) as HTMLElement;

	// 	nextsmall.classList.remove("gosmall");
	// 	nextsmall.classList.add("backsmall");
	// 	next.classList.remove("go");
	// 	next.classList.add("back");

	// 	const nextsmall2 = document.querySelector(
	// 		`.ShopContainer__imgContainer__smallWrap__small${count + 1}`,
	// 	) as HTMLElement;
	// 	if (nextsmall2 == null) {
	// 		return;
	// 	}
	// 	nextsmall2.classList.remove("backsmall");
	// 	nextsmall2.classList.add("gosmall");
	// };

	const ShopButton = (): void => {
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
		<section className="ShopContents">
			<div className="ShopContainer">
				<div className="ShopContainer__imgContainer">
					<div className="ShopContainer__imgContainer__bigWrap">
						{initialState.map((content: any) => {
							let name = `ShopContainer__imgContainer__big${content.id}`;
							return <div className={name} key={content.id}></div>;
						})}
					</div>
					{/* <div className="ShopContainer__imgContainer__smallWrap">
						<button className="ShopContainer__imgContainer__smallWrap__leftButton">
							<KeyboardArrowLeftIcon
								fontSize="inherit"
								onClick={leftPhotoButton}
							/>
						</button>
						{initialState.map((content: any) => {
							let name = `ShopContainer__imgContainer__smallWrap__small${content.id}`;
							return <div className={name} key={content.id}></div>;
						})}
						<button
							className="ShopContainer__imgContainer__smallWrap__rightButton"
							onClick={rightPhotoButton}
						>
							<KeyboardArrowRightIcon fontSize="inherit" />
						</button>
					</div> */}
				</div>
				{initialState.slice(0, 1).map((content: any) => (
					<div className="ShopContainer__wrap" key={content.id}>
						<div className="ShopContainer__title" key={content.id}>
							{content.nick}
						</div>
						<div className="ShopContainer__nameAndLike">
							<div className="ShopContainer__name">{content.name}</div>
							<div className="ShopContainer__likeAndCount">
								{like ? (
									<button
										className="ShopContainer__like"
										onClick={likeButtonClick}
									>
										<FavoriteIcon fontSize="inherit" />
									</button>
								) : (
									<button
										className="ShopContainer__unlike"
										onClick={likeButtonClick}
									>
										<FavoriteBorderIcon fontSize="inherit" />
									</button>
								)}
								<span className="ShopContainer__likeCount">123</span>
							</div>
						</div>
						<div className="ShopContainer__category"># {content.category}</div>
						<div className="ShopContainer__divideLine"></div>
						<div className="ShopContainer__text">
							<div className="ShopContainer__left">
								<div className="ShopContainer__price">판매가</div>
								{/* <div className="ShopContainer__priceNumber">참여 인원</div> */}
							</div>
							<div className="ShopContainer__right">
								<div className="ShopContainer__priceText">
									₩{" "}
									{content.price
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
								</div>
								{/* <div className="ShopContainer__priceNumberText">102 명</div> */}
							</div>
						</div>
						<div className="ShopContainer__divideLine"></div>
						<div className="ShopContents__body">
							잠자는 나비 포즈 실화냐? <br />
							너무 커엽다 가슴이 웅장해진다..
							<br /> 진짜 나비는 전설이다
							<br /> 이 정도 나비면 국대 원탑 급 고양이다 ㅇㅈ?
						</div>
						<div className="ShopContainer__divideLine"></div>

						{isUser ? (
							<div className="ShopContents__body__buttonWrap">
								<button
									className="ShopContents__body__submitButton"
									onClick={likeButtonClick}
								>
									수정
								</button>
								<button
									className="ShopContents__body__deleteButton"
									onClick={ShopButton}
								>
									삭제
								</button>
							</div>
						) : (
							<div className="ShopContents__body__buttonWrap">
								<button
									className="ShopContents__body__likebutton"
									onClick={likeButtonClick}
								>
									좋아요
								</button>
								<button
									className="ShopContents__body__button"
									onClick={ShopButton}
								>
									구매하기
								</button>
							</div>
						)}
					</div>
				))}
			</div>
			{apprasialState ? (
				<div className="ShopContents__inputModal">
					<button
						className="ShopContents__inputModal__close"
						onClick={ShopButton}
					>
						<CloseIcon fontSize="inherit" />
					</button>
					<div className="ShopContents__inputWrap">
						<div className="ShopContents__input__title">판매자 연락처</div>

						<span className="ShopContents__input__text">010-7307-3883</span>
					</div>
				</div>
			) : null}
		</section>
	);
}

export default withRouter(ShopContents);
