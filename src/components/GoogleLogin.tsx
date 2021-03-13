import React, { useState, useEffect } from "react";
import GoogleBtn from "../assets/img/button/google.png";
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
function GoogleLogin({ loginHandler, history, location }: ILoginUser) {
	const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile&access_type=offline&include_granted_scopes=true&state=state_parameter_passthrough_value&
redirect_uri=https://www.yeongn.com/login&response_type=code&client_id=
604944373689-q294luegtuje1qpkiq0q3jrfqd8ps6qp.apps.googleusercontent.com`;

	const googleLoginHandler = () => {
		window.location.assign(GOOGLE_LOGIN_URL);
	};

	const getAuth = (authorizationCode: string) => {
		const url = "/api/user/google";
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
		if (authorizationCode && googleCheck !== -1) {
			getAuth(authorizationCode);
		}
	});

	return (
		<div className="loginContainer" onClick={googleLoginHandler}>
			<img src={GoogleBtn} alt="googlebutton" className="loginBtn" />
		</div>
	);
}

export default withRouter(GoogleLogin);
