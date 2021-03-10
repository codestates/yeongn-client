import React, { useState, useEffect } from "react";
import KakaoBtn from "../assets/img/button/kakao.png";
import axios from "axios";
import "../styles/login.css";
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
	const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=b862dc01a142ef533360f21219d2247b&redirect_uri=http://localhost:3000/login`;
	const kakaoLoginHandler = () => {
		window.location.assign(KAKAO_LOGIN_URL);
		console.log("kakaokakaokakaokakaokakaokakaokakao");
	};

	const getAuth = (authorizationCode: any) => {
		const url = "https://yeongn.com/api/user/kakao";
		console.log("jebal");
		axios
			.post(url, { authorizationCode }, { withCredentials: true })
			.then((res) => {
				console.log(res.data);
				loginHandler({
					userId: res.data.userId,
					token: res.data.token,
					authenticated: true,
				});
				history.push("/");
			})
			.catch(() => {
				console.log("ssibal");
			});
	};

	useEffect(() => {
		const url = new URL(window.location.href);
		const authorizationCode = url.searchParams.get("code");
		const kakaoCheck = window.location.href.indexOf("login");
		const googleCheck = window.location.href.indexOf("google");
		if (authorizationCode && kakaoCheck !== -1 && googleCheck === -1) {
			console.log("Kakao", authorizationCode);
			// getAuth(authorizationCode);
		}
	});

	return (
		<div className="loginContainer" onClick={kakaoLoginHandler}>
			<img src={KakaoBtn} alt="kakaobutton" className="loginBtn" />
		</div>
	);
}

export default withRouter(KakaoLogin);
