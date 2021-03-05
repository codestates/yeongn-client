import React from "react";
import { Link, withRouter } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MyPageStore from "../components/MyPageStore";
import MyPageProfile from "../components/MyPageProfile";
import MyPageLikes from "../components/MyPageLikes";
import MyPageRequest from "../components/MyPageRequest";
import "../styles/MyPage.css";
		
function MyPage() {
	return (
		<div id="mypage">
			<Header />
			<section className="mypage__container">
				<MyPageProfile />
				<MyPageRequest />
				<MyPageStore />
				<MyPageLikes />
			</section>
			<Footer />
		</div>
	);
}

export default withRouter(MyPage);
