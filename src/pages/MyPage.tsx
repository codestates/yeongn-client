import React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import Footer from "../components/Footer";
import MyPageStore from "../components/MyPageStore";
import MyPageProfile from "../components/MyPageProfile";
import MyPageRequest from "../components/MyPageRequest";
import ScrollToTop from "../components/ScrollToTop";
import Withdrawal from "../components/Withdrawal";
import "../styles/MyPage.css";

interface User {
	userId: string;
	token: string;
	authenticated: boolean;
}
interface IMypageUser extends RouteComponentProps {
	user: User;
	handleUserdata: () => void;
}

function MyPage({
	user,
	history,
	match,
	location,
	handleUserdata,
}: IMypageUser) {
	return (
		<div id="mypage">
			<section className="mypage__container">
				<MyPageProfile user={user} />
				<MyPageRequest user={user} />
				<MyPageStore user={user} />
				<Withdrawal user={user} handleUserdata={handleUserdata} />
			</section>
			<Footer />
			<ScrollToTop />
		</div>
	);
}

export default withRouter(MyPage);
