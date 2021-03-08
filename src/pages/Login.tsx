import React, { useState, useEffect } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import GoogleLogin from "../components/GoogleLogin";
import NaverLogin from "../components/NaverLogin";
import KakaoLogin from "../components/KakaoLogin";
import logo from "../assets/img/logo.png";
import "../styles/login.css";

interface User {
	userId: string;
	userEmail: string;
	authenticated: boolean;
}
interface ILoginUser extends RouteComponentProps {
	loginHandler: (user: User) => void;
}
function Login({ loginHandler }: ILoginUser) {
	const [errorMessage, setError] = useState("");
	const [isLoad, setIsLoad] = useState(false);

	return (
		<div id="login">
			<section className="loginSection">
				<img src={logo} alt="yeongnlogo" className="logoImg" />
				<h2 className="login__name">연근마켓</h2>
				<div className="login__title">
					이 세상의 무쓸모는 없다!
					<br />
					물건들의 가치를 같이 알아보아요!
				</div>
				<GoogleLogin loginHandler={loginHandler} />
				<NaverLogin />
				<KakaoLogin />
			</section>
		</div>
	);
}

export default withRouter(Login);
