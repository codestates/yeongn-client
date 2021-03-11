import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import "../styles/MyPageProfile.css";
import ArrowUp from "../components/ArrowUp";

interface User {
	userId: string;
}
interface IMypageUser {
	user: User;
}
function MyPageProfile({ user }: IMypageUser) {
	/**
	 * 필요한 속성
	 *
	 * 나의 닉네임, 내가 감정한 횟수, 나의 티어 //!마이페이지에서 가져와야함
	 *
	 * 필요한 기능
	 * 버튼을 눌렀을 시 서버에 닉네임 변경 요청
	 */
	//!밑에 속성은 임의로 정해준 것 fakedata
	const myNickname: string = user.userId;
	const myRequest: string = "33";
	const myTier: string = "전문감정가";

	return (
		<div className="mypage__profile">
			<div className="profile__title">
				<Link to="/mypage">MY PAGE</Link>
			</div>
			<div className="profile__description">
				<div className="profile__description__name">
					<div className="profile__nickname__container">
						<div className="nickname__title">{`닉네임 >`}</div>
						<div className="name__nickname">{user.userId}</div>
					</div>
					<button className="name__change">닉네임 변경</button>
				</div>
				<div className="help__tier__container">
					<div className="profile__description__help">
						<div className="help__title">{`내가 감정한 횟수 >`}</div>
						<div className="help__many"> {myRequest}회</div>
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

export default MyPageProfile;
