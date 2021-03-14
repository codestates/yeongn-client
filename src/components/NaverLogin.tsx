import React, { useState, useEffect } from "react";
import NaverBtn from "../assets/img/button/naver.png";
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
function NaverLogin({ loginHandler, history, location }: ILoginUser) {
	const NAVER_LOGIN_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=6uSvluf8fHGhNvp6U3j2&redirect_uri=https://www.yeongn.com/login`;

	const naverLoginHandler = () => {
		window.location.assign(NAVER_LOGIN_URL);
	};

	const getAuth = (authorizationCode: any) => {
		const url = "/api/user/naver";
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
		const naverCheck = window.location.href.indexOf("google");
		if (
			authorizationCode &&
			authorizationCode.length < 50 &&
			naverCheck === -1
		) {
			getAuth(authorizationCode);
		}
	});

	return (
		<div className="loginContainer" onClick={naverLoginHandler}>
			<img src={NaverBtn} alt="naverbutton" className="loginBtn" />
		</div>
	);
}

export default withRouter(NaverLogin);
