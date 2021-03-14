import React, { useState, useEffect, useRef } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import axios from "axios";
import "../styles/AppraisalContents.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CloseIcon from "@material-ui/icons/Close";
import Loading from "../components/Loading";
import { AddAlertSharp } from "@material-ui/icons";

interface User {
	userId: string;
	token: string;
	authenticated: boolean;
}
interface IMypageUser extends RouteComponentProps<any> {
	user: User;
	setContentId: (e: any) => void;
	setUserId: (e: any) => void;
	setModify: (e: boolean) => void;
}

// interface UserData {
// 	appraisalCount: number;
// 	average: number;
// 	category: string;
// 	createdAt: string;
// 	description: string;
// 	id: number;
// 	imgUrl: string;
// 	itemName: string;
// 	likeCount: number;
// 	nickname: string;
// 	userId: number;
// 	userPrice: string;
// 	usersAppraisalsPrices: [];
// }

function AppraisalContents({
	user,
	match,
	history,
	setContentId,
	setUserId,
	setModify,
}: IMypageUser) {
	const id = match.params.id;

	const [appraisalList, setAppraisalList] = useState<any>();
	const [like, setLike] = useState<boolean>(false);
	const [count, setCount] = useState<number>();
	const [apprasialState, setApprasialState] = useState<boolean>(false);
	const [price, setPrice] = useState<number>(0);
	const [isUser, setIsUser] = useState<boolean>(false);
	const [isAppraisal, setIsAppraisal] = useState<boolean>(false);

	const renderContents = (): void => {
		if (user.token) {
			axios
				.get(`/api/appraisal/${id}`, {
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				})
				.then((res) => {
					if (res.data.userId === +user.userId) {
						setIsUser(!isUser);
					}
					setIsAppraisal(res.data.didAppraisal);
					setUserId(res.data.userId);
					setContentId(res.data.id);
					setCount(res.data.likeCount);
					setAppraisalList(res.data);
					if (res.data.isRecommend) {
						setLike(true);
						const likeButton = document.querySelector(
							`.AppraisalContents__body__likebutton`,
						) as HTMLElement;
						if (!likeButton) {
							return;
						}
						likeButton.classList.add("like");
					} else {
						setLike(false);
						const likeButton = document.querySelector(
							`.AppraisalContents__body__likebutton.like`,
						) as HTMLElement;
						if (!likeButton) {
							return;
						}
						likeButton.classList.remove("like");
					}
				});
		} else {
			axios.get(`/api/appraisal/${id}`, {}).then((res) => {
				setCount(res.data.likeCount);
				setAppraisalList(res.data);
			});
		}
	};

	useEffect(() => {
		renderContents();
	}, []);
	const likeButtonClick = (): void => {
		if (!user.token) {
			alert("로그인 후 이용해주세요.");
		}
		axios
			.patch(
				`/api/appraisal/${id}/recommend`,
				{},
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				},
			)
			.then((res) => {
				setCount(res.data.count);
				if (like) {
					setLike(false);
					const likeButton = document.querySelector(
						`.AppraisalContents__body__likebutton.like`,
					) as HTMLElement;
					likeButton.classList.remove("like");
				} else {
					setLike(true);
					const likeButton = document.querySelector(
						`.AppraisalContents__body__likebutton`,
					) as HTMLElement;
					if (likeButton == null) {
						return;
					}
					likeButton.classList.add("like");
				}
			})
			.catch((err) => alert(err));
	};
	const modalButton = () => {
		if (isAppraisal) {
			return alert("이미 감정하신 게시글입니다.");
		}

		if (!user.token) {
			return alert("로그인 후 이용해주세요.");
		}
		setApprasialState(!apprasialState);
	};

	const appraisalButton = (): void => {
		if (!user.token) {
			alert("로그인 후 이용해주세요.");
		}
		axios
			.post(
				`/api/appraisal/${id}`,
				{ price },
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				},
			)
			.then(() => {
				setApprasialState(!apprasialState);
				axios.get(`/api/appraisal/${id}`, {}).then((res) => {
					setIsAppraisal(true);
					setAppraisalList(res.data);
				});
				renderContents();
			});
	};
	const handleKeyPress = (e: any) => {
		if (e.key === "Enter") {
			appraisalButton();
		}
	};
	const changePrice = (e: any) => {
		setPrice(e.target.value);
	};

	const numRef = useRef<HTMLInputElement>(null);
	const onWheel = () => {
		if (numRef.current !== null) {
			numRef.current.blur();
		}
	};

	const deleteContent = () => {
		const result = window.confirm("삭제 하시겠습니까?");

		if (result) {
			axios
				.delete(`/api/appraisal/${id}`, {
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				})
				.then(() => history.push("/appraisal"))
				.catch((err) => alert(err));
		} else {
			return;
		}
	};

	const modifyBtn = () => {
		setModify(true);
	};

	return (
		<section className="AppraisalContents">
			{!appraisalList ? (
				<Loading />
			) : (
				<div>
					{" "}
					<div className="AppraisalContainer">
						<div className="AppraisalContainer__imgContainer">
							<div className="AppraisalContainer__imgContainer__bigWrap">
								<img
									src={!appraisalList ? null : appraisalList.imgUrl}
									className="AppraisalContainer__imgContainer__big1"
								></img>
							</div>
						</div>
						{!appraisalList ? null : (
							<div className="AppraisalContainer__wrap">
								<div className="AppraisalContainer__title">
									{appraisalList.nickname}
								</div>

								<div className="AppraisalContainer__nameAndLike">
									<div className="AppraisalContainer__name">
										{appraisalList.itemName}
									</div>
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
										<span className="AppraisalContainer__likeCount">
											{count}
										</span>
									</div>
								</div>
								<div className="AppraisalContainer__category">
									# {appraisalList.category}
								</div>
								<div className="AppraisalContainer__divideLine"></div>
								<div className="AppraisalContainer__text">
									<div className="AppraisalContainer__left">
										<div className="AppraisalContainer__price">
											{" "}
											예상 감정가
										</div>
										<div className="AppraisalContainer__price">평균 감정가</div>
										<div className="AppraisalContainer__priceNumber">
											참여 인원
										</div>
									</div>
									<div className="AppraisalContainer__right">
										<div className="AppraisalContainer__priceText">
											{!appraisalList
												? null
												: appraisalList.userPrice
														.toString()
														.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
											원
										</div>
										<div className="AppraisalContainer__priceText">
											₩{" "}
											{!appraisalList
												? null
												: appraisalList.average
														.toString()
														.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
											원
										</div>
										<div className="AppraisalContainer__priceNumberText">
											{appraisalList.appraisalCount} 명
										</div>
									</div>
								</div>
								<div className="AppraisalContainer__divideLine"></div>
								<div className="AppraisalContents__body">
									{appraisalList.description}
								</div>
								<div className="AppraisalContainer__divideLine"></div>

								{isUser ? (
									<div className="AppraisalContents__body__buttonWrap">
										<Link
											to={"/modify/appraisal"}
											className="AppraisalContents__body__submitButton"
											onClick={modifyBtn}
										>
											수정
										</Link>
										<button
											className="AppraisalContents__body__deleteButton"
											onClick={deleteContent}
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
											onClick={modalButton}
										>
											감정하기
										</button>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			)}
			{apprasialState ? (
				<div className="AppraisalContents__inputModal">
					<button
						className="AppraisalContents__inputModal__close"
						onClick={modalButton}
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
							type="Number"
							ref={numRef}
							onWheel={onWheel}
							onKeyPress={handleKeyPress}
						></input>
						<span className="AppraisalContents__input__text">원</span>
						<button
							className="AppraisalContents__input__button"
							onClick={appraisalButton}
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
