import React, { useState, useEffect } from "react";
import "./App.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useHistory,
} from "react-router-dom";
import Appraisal from "./pages/Appraisal";
import AppraisalContent from "./pages/AppraisalContent";
import AppraisalList from "./pages/AppraisalList";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import MyPageLikesAdd from "./pages/MyPageLikesAdd";
import MyPageRequestAdd from "./pages/MyPageRequestAdd";
import MyPageStoreAdd from "./pages/MyPageStoreAdd";
import RegisterAppraisal from "./pages/RegisterAppraisal";
import RegisterSale from "./pages/RegisterSale";
import Search from "./pages/Search";
import Shop from "./pages/Shop";
import ShopContent from "./pages/ShopContent";
import ShopList from "./pages/ShopList";
import AuthRoute from "./components/AuthRoute";
import Header from "./components/Header";
import RegisterAppraisalModify from "./pages/RegisterAppraisalModify";
import RegisterSaleModify from "./pages/RegisterSaleModify";
import Cookies from "js-cookie";
import axios from "axios";

interface User {
	userId: string;
	token: string;
	authenticated: boolean;
}

function App() {
	//! 로그인 했을 때 바뀌는 setUser
	const userIdCookie = Cookies.get("userId");
	const tokenCookie = Cookies.get("token");

	const [user, setUser] = useState({
		userId: userIdCookie ? userIdCookie : "",
		token: tokenCookie ? tokenCookie : "",
		authenticated: userIdCookie && tokenCookie ? true : false,
	});

	const [userIdM, setUserId] = useState<any>();
	const [contentId, setContentId] = useState<any>();
	const [Modify, setModify] = useState<boolean>(false);

	//! 헤더에서 상태가 바껴지는 서치 인풋 최상단 에서 관리하여
	//! 써치로 뿌려주는 형식

	const loginHandler = (userData: User) => {
		setUser(userData);
	};
	const history = useHistory();
	const logoutHandler = async () => {
		const LOGOUT_URI = "https://www.yeongn.com/api/user/logout";
		setUser({ userId: "", token: "", authenticated: false });
		try {
			await axios.post(LOGOUT_URI, {}, { withCredentials: true });
		} catch {
			alert("문제가 발생했습니다.");
		}
	};
	const handleUserdata = () => {
		setUser({ userId: "", token: "", authenticated: false });
	};
	useEffect(() => {
		if (userIdCookie && tokenCookie && !user.authenticated)
			loginHandler({
				userId: userIdCookie,
				token: tokenCookie,
				authenticated: true,
			});
	}, []);

	return (
		<Router>
			<Header user={user} logoutHandler={logoutHandler} />
			<Switch>
				<Route
					exact
					path="/"
					render={() => {
						return <Home />;
					}}
				/>
				<Route
					exact
					path="/login"
					render={() => {
						return <Login loginHandler={loginHandler} />;
					}}
				/>
				<Route
					exact
					path="/mypage"
					render={() => {
						return <MyPage user={user} handleUserdata={handleUserdata} />;
					}}
				/>
				<Route
					exact
					path="/appraisal"
					render={() => {
						return <Appraisal />;
					}}
				/>
				<Route
					exact
					path="/appraisal/:id"
					render={() => {
						return (
							<AppraisalContent
								user={user}
								setContentId={setContentId}
								setUserId={setUserId}
								setModify={setModify}
							/>
						);
					}}
				/>
				<Route
					exact
					path="/list/appraisal"
					render={() => {
						return <AppraisalList />;
					}}
				/>
				<AuthRoute
					authenticated={user.authenticated}
					exact
					path="/mypage/request"
					component={MyPageRequestAdd}
					user={user}
				/>
				<AuthRoute
					exact
					authenticated={user.authenticated}
					path="/mypage/shop"
					component={MyPageStoreAdd}
					user={user}
				/>
				<AuthRoute
					exact
					authenticated={user.authenticated}
					path="/mypage/likes"
					component={MyPageLikesAdd}
					user={user}
				/>
				<AuthRoute
					exact
					authenticated={user.authenticated}
					path="/register/appraisal"
					component={RegisterAppraisal}
					user={user}
				/>
				<AuthRoute
					exact
					authenticated={user.authenticated}
					path="/register/shop"
					component={RegisterSale}
					user={user}
				/>
				<Route
					exact
					path="/search/:input"
					render={() => {
						return <Search />;
					}}
				/>
				<Route
					exact
					path="/shop"
					render={() => {
						return <Shop />;
					}}
				/>
				<Route
					exact
					path="/modify/appraisal"
					render={() => {
						return (
							<RegisterAppraisalModify user={user} contentId={contentId} />
						);
					}}
				/>
				<Route
					exact
					path="/modify/shop"
					render={() => {
						return <RegisterSaleModify user={user} contentId={contentId} />;
					}}
				/>
				<Route
					exact
					path="/shop/:id"
					render={() => {
						return <ShopContent user={user} setContentId={setContentId} />;
					}}
				/>
				<Route
					exact
					path="/list/shop"
					render={() => {
						return <ShopList />;
					}}
				/>
			</Switch>
		</Router>
	);
}
export default App;
