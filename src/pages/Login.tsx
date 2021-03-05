import React, { useState, useEffect } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

interface ILoginProps extends RouteComponentProps {
	issueAccessToken: (token: string) => void;
}

function Login({ issueAccessToken, history }: ILoginProps) {
	const [errorMessage, setError] = useState("");
	const [isLoad, setIsLoad] = useState(false);

	return (
		<div id="login">
			{/* 밑에 h1 삭제하고 컴포넌트 입력하기 */}
			<h1>로그인 페이지 입니다.</h1>
			{/* todo */}
		</div>
	);
}

export default withRouter(Login);
