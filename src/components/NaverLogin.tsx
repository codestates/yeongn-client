import React, { useState, useEffect } from "react";
import NaverBtn from "../assets/img/button/naver.png";
import axios from "axios";
import "../styles/login.css";
import {
	Link,
	withRouter,
	RouteComponentProps,
	useHistory,
} from "react-router-dom";
interface User {
	userId: string;
	userEmail: string;
	authenticated: boolean;
}
interface ILoginUser extends RouteComponentProps {
	user: User;
	loginHandler: (user: User) => void;
}
function NaverLogin() {
	const history = useHistory();
	const NAVER_LOGIN_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=6uSvluf8fHGhNvp6U3j2&redirect_uri=http://localhost:3000/login`;

	const naverLoginHandler = () => {
		window.location.assign(NAVER_LOGIN_URL);
		console.log("navernavernavernavernavernaver");
	};

	const getAuth = (authorizationCode: any) => {
		const url = "https://yeongn.com/api/user/naver";
		axios.post(url, { authorizationCode }).then((res) => {
			console.log(res.data);
		});
	};

	useEffect(() => {
		const url = new URL(window.location.href);
		const authorizationCode = url.searchParams.get("code");
		const googleCheck = window.location.href.indexOf("google");
		if (authorizationCode && googleCheck === -1) {
			console.log("Naver", authorizationCode);
			// getAuth(authorizationCode);
		}
	});

	return (
		<div className="loginContainer" onClick={naverLoginHandler}>
			<img src={NaverBtn} alt="naverbutton" className="loginBtn" />
		</div>
	);
}

export default NaverLogin;
