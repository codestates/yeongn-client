import React, { useState, useEffect, useRef } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import "../styles/ShopContents.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";

interface User {
	userId: string;
	token: string;
	authenticated: boolean;
}
interface IMypageUser extends RouteComponentProps<any> {
	user: User;
	setContentId: (e: any) => void;
}

function ShopContents({ user, match, history, setContentId }: IMypageUser) {
	const [shopList, setShopList] = useState<any>();
	const [like, setLike] = useState<boolean>(false);
	const [count, setCount] = useState<number>(1);
	const [shopButton, setShopButton] = useState<boolean>(false);
	const [isUser, setIsUser] = useState<boolean>(false);
	const id = match.params.id;

	const renderContents = (): void => {
		if (user.token) {
			axios
				.get(`https://www.yeongn.com/api/shop/${id}`, {
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				})
				.then((res) => {
					if (res.data.userId === +user.userId) {
						setIsUser(!isUser);
					}
					setContentId(res.data.id);
					setCount(res.data.likeCount);
					setShopList(res.data);
					if (res.data.isRecommend) {
						setLike(true);
						const likeButton = document.querySelector(
							`.ShopContents__body__likebutton`,
						) as HTMLElement;
						likeButton.classList.add("like");
					} else {
						setLike(false);

						const likeButton = document.querySelector(
							`.ShopContents__body__likebutton.like`,
						) as HTMLElement;
						if (likeButton == null) {
							return;
						}
						likeButton.classList.remove("like");
					}
				});
		} else {
			axios.get(`https://www.yeongn.com/api/shop/${id}`, {}).then((res) => {
				console.log(res);
				setCount(res.data.likeCount);
				setShopList(res.data);
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
				`https://www.yeongn.com/api/shop/${id}/recommend`,
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
						`.ShopContents__body__likebutton.like`,
					) as HTMLElement;
					if (likeButton == null) {
						return;
					}
					likeButton.classList.remove("like");
				} else {
					setLike(true);
					const likeButton = document.querySelector(
						`.ShopContents__body__likebutton`,
					) as HTMLElement;
					if (likeButton == null) {
						return;
					}
					likeButton.classList.add("like");
				}
			})
			.catch((err) => console.log(err));
	};

	const modalButton = () => {
		if (!user.token) {
			return alert("로그인 후 이용해주세요.");
		}
		setShopButton(!shopButton);
	};

	const deleteContent = () => {
		const result = window.confirm("삭제 하시겠습니까?");

		if (result) {
			axios
				.delete(`https://www.yeongn.com/api/shop/${id}`, {
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				})
				.then(() => history.push("/shop"))
				.catch((err) => console.log(err));
		} else {
			return;
		}
	};

	const closeBtn = () => {
		setShopButton(false);
	};
	return (
		<section className="ShopContents">
			<div className="ShopContainer">
				<div className="ShopContainer__imgContainer">
					<div className="ShopContainer__imgContainer__bigWrap">
						<img
							src={!shopList ? null : shopList.imgUrl}
							className="ShopContainer__imgContainer__big1"
						></img>
					</div>
				</div>
				{!shopList ? null : (
					<div className="ShopContainer__wrap">
						<div className="ShopContainer__title">{shopList.nickname}</div>
						<div className="ShopContainer__nameAndLike">
							<div className="ShopContainer__name">{shopList.itemName}</div>
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
								<span className="ShopContainer__likeCount">{count}</span>
							</div>
						</div>
						<div className="ShopContainer__category"># {shopList.category}</div>
						<div className="ShopContainer__divideLine"></div>
						<div className="ShopContainer__text">
							<div className="ShopContainer__left">
								<div className="ShopContainer__price">판매가</div>
							</div>
							<div className="ShopContainer__right">
								<div className="ShopContainer__priceText">
									₩{" "}
									{!shopList
										? null
										: shopList.userPrice
												.toString()
												.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
									원
								</div>
							</div>
						</div>
						<div className="ShopContainer__divideLine"></div>
						<div className="ShopContents__body">{shopList.description}</div>
						<div className="ShopContainer__divideLine"></div>
						{isUser ? (
							<div className="ShopContents__body__buttonWrap">
								<Link
									to={"/modify/shop"}
									className="ShopContents__body__submitButton"
								>
									수정
								</Link>
								<button
									className="ShopContents__body__deleteButton"
									onClick={deleteContent}
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
									onClick={modalButton}
								>
									구매하기
								</button>
							</div>
						)}
					</div>
				)}
			</div>
			{shopButton ? (
				<div className="ShopContents__inputModal">
					<button
						className="ShopContents__inputModal__close"
						onClick={closeBtn}
					>
						<CloseIcon fontSize="inherit" />
					</button>
					<div className="ShopContents__inputWrap">
						<div className="ShopContents__input__title">판매자 연락처</div>
						<span className="ShopContents__input__text">
							{shopList.contact}
						</span>
					</div>
				</div>
			) : null}
		</section>
	);
}

export default withRouter(ShopContents);
