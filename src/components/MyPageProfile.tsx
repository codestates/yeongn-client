import React, { useState, useEffect, useRef } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import "../styles/MyPageProfile.css";
import ArrowUp from "../components/ArrowUp";
import axios from "axios";
import CloseIcon from "@material-ui/icons/Close";

interface User {
	userId: string;
	token: string;
	authenticated: boolean;
}
interface IMypageUser extends RouteComponentProps {
	user: User;
}
function MyPageProfile({ user, history }: IMypageUser) {
	useEffect(() => {
		const getUrl = "/api/user";
		const config = {
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		};
		axios
			.get(getUrl, config)
			.then((res) => {
				setNick(res.data.nickname);
				setAppraisalCount(res.data.appraisalCount);
				handleTier(res.data.appraisalCount);
			})
			.catch((err) => {
				alert(err);
			});
		window.addEventListener("click", handleClickOutside);
		return () => {
			window.removeEventListener("click", handleClickOutside);
		};
	});

	//!밑에 속성은 임의로 정해준 것 fakedata
	const myNickname: string = user.userId;

	//! 닉네임 관련
	const [nick, setNick] = useState("");
	const [changeNick, setChangeNick] = useState("");
	const [isChangeNick, setisChangeNick] = useState(false);
	const modalEl = useRef<HTMLInputElement>(null);
	const inputEl = useRef<HTMLInputElement>(null);

	const handleClickOutside = (e: any) => {
		if (modalEl.current !== null) {
			if (inputEl.current !== null) {
				inputEl.current.focus();
				if (isChangeNick && !modalEl.current.contains(e.target)) {
					setisChangeNick(false);
				}
			}
		}
	};
	const validNickCheck = (nickname: string) => {
		if (2 <= nickname.length && nickname.length <= 8) {
			var valNick = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*]+$/;
			if (valNick.test(nickname)) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	};

	//! 렌더관련정보
	const [appraisalCount, setAppraisalCount] = useState(0);
	const [myTier, setTier] = useState("");

	const handleTier = (tier: number) => {
		if (tier < 5) {
			setTier("아이언");
		} else if (tier < 10) {
			setTier("브론즈");
		} else if (tier < 15) {
			setTier("실버");
		} else if (tier < 30) {
			setTier("골드");
		} else if (tier < 40) {
			setTier("플래티넘");
		} else if (tier < 50) {
			setTier("다이아몬드");
		} else if (tier < 100) {
			setTier("마스터");
		} else if (tier < 200) {
			setTier("그랜드마스터");
		} else {
			setTier("챌린저");
		}
	};
	const handleKeyPress = (e: any) => {
		if (e.key === "Enter") {
			handleNickChangeClick();
		}
	};
	const changeButtonHandler = () => {
		setisChangeNick(true);
	};
	const closeButtonHandler = () => {
		setisChangeNick(false);
	};
	const handleChangeNick = (e: any) => {
		setChangeNick(e.target.value);
	};
	const handleNickChangeClick = () => {
		if (validNickCheck(changeNick)) {
			const postUrl = "/api/user";
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			axios
				.patch(
					postUrl,
					{
						nickname: changeNick,
					},
					config,
				)
				.then((res) => {
					alert("닉네임 변경 성공!");
					setisChangeNick(false);
					history.push("/mypage");
				})
				.catch((err) => {
					alert(err);
				});
		} else {
			alert("닉네임을 확인하세요");
		}
	};

	return (
		<div className="mypage__profile">
			<div className="profile__title">
				<Link to="/mypage">MY PAGE</Link>
			</div>
			<div className="profile__description">
				<div className="profile__description__name">
					<div className="profile__nickname__container">
						<div className="nickname__title">{`닉네임 >`}</div>
						<div className="name__nickname">{nick}</div>
					</div>
					<button className="name__change" onClick={changeButtonHandler}>
						닉네임 변경
					</button>
					{isChangeNick ? (
						<div id="changeNick__section" ref={modalEl}>
							<div className="changeNick__modal__container">
								<div className="changeNick__modal__close">
									<button
										className="modal__close__btn"
										onClick={closeButtonHandler}
									>
										<CloseIcon fontSize="inherit" />
									</button>
								</div>
								<div className="modal__input__container">
									<input
										type="text"
										onChange={handleChangeNick}
										onKeyPress={handleKeyPress}
										placeholder=" 2~8 자리만 입력가능합니다."
										className="modal__nick__input"
										ref={inputEl}
									/>
									<button
										className="modal__nick__btn"
										onClick={handleNickChangeClick}
									>
										변경
									</button>
								</div>
							</div>
						</div>
					) : (
						<div className="changeNick__modal__disable"></div>
					)}
				</div>
				<div className="help__tier__container">
					<div className="profile__description__help">
						<div className="help__title">{`내가 감정한 횟수 >`}</div>
						<div className="help__many"> {appraisalCount}회</div>
					</div>
					<div className="profile__description__tier">
						<div className="tier__title">{`티어 >`}</div>
						<div className="tier__grade">{myTier}</div>
					</div>
				</div>
			</div>
			<ArrowUp />
		</div>
	);
}

export default withRouter(MyPageProfile);
