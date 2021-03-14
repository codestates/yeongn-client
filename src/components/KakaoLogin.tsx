import React, { useState, useEffect } from "react";
import KakaoBtn from "../assets/img/button/kakao.png";
import axios from "axios";
import "../styles/login.css";
import usePrevious from "../components/usePrevious";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
interface User {
	userId: string;
	token: string;
	authenticated: boolean;
}
interface ILoginUser extends RouteComponentProps {
	loginHandler: (user: User) => void;
}
function KakaoLogin({ loginHandler, history, location }: ILoginUser) {
	const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=b862dc01a142ef533360f21219d2247b&redirect_uri=https://www.yeongn.com/login`;
	const kakaoLoginHandler = () => {
		window.location.assign(KAKAO_LOGIN_URL);
	};

	const getAuth = (authorizationCode: any) => {
		const url = "/api/user/kakao";

		axios
			.post(url, { authorizationCode }, { withCredentials: true })
			.then((res) => {
				loginHandler({
					userId: res.data.userId,
					token: res.data.token,
					authenticated: true,
				});
				history.push("/");
			})
			.catch(() => {
				alert("서버오류로 로그인이 불가합니다.");
			});
	};

	useEffect(() => {
		const url = new URL(window.location.href);
		const authorizationCode = url.searchParams.get("code");
		const googleCheck = window.location.href.indexOf("google");
		if (
			authorizationCode &&
			authorizationCode.length > 50 &&
			googleCheck === -1
		) {
			getAuth(authorizationCode);
		}
	});

	return (
		<div className="loginContainer" onClick={kakaoLoginHandler}>
			<img src={KakaoBtn} alt="kakaobutton" className="loginBtn" />
		</div>
	);
}

export default withRouter(KakaoLogin);
