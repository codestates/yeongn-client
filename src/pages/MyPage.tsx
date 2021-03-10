import React, { ReactComponentElement } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import Footer from "../components/Footer";
import MyPageStore from "../components/MyPageStore";
import MyPageProfile from "../components/MyPageProfile";
import MyPageLikes from "../components/MyPageLikes";
import MyPageRequest from "../components/MyPageRequest";
import "../styles/MyPage.css";

interface User {
	userId: string;
	token: string;
	authenticated: boolean;
}
interface IMypageUser extends RouteComponentProps {
	user: User;
}

function MyPage({ user, history, match, location }: IMypageUser) {
	return (
		<div id="mypage">
			<section className="mypage__container">
				<MyPageProfile user={user} />
				<MyPageRequest />
				<MyPageStore />
				<MyPageLikes />
			</section>
			<Footer />
		</div>
	);
}

export default withRouter(MyPage);
