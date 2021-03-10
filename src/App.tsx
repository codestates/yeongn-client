import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
import axios from "axios";

interface User {
	userId: string;
	token: string;
	authenticated: boolean;
}

function App() {
	//! 로그인 했을 때 바뀌는 setUser
	const [user, setUser] = useState({
		userId: "",
		token: "",
		authenticated: true,
	});

	//! 헤더에서 상태가 바껴지는 서치 인풋 최상단 에서 관리하여
	//! 써치로 뿌려주는 형식

	//Search에 보내줘야하는 것들
	// const [searchInput, setSearch] = useState("");
	// const handleChangeSearch = (searchInput:string):void =>{
	// 	console.log(searchInput);
	// 	setSearch(searchInput);
	// }

	const loginHandler = (userData: User) => {
		setUser(userData);
	};

	const logoutHandler = () => {
		setUser({ userId: "", token: "", authenticated: false });
	};

	// const issueAccessToken = (token: string) => {
	// 	setToken(token);
	// 	axios
	// 		.get("https://s.nugathesam.com/users", {
	// 			headers: { Authorization: `Bearer ${token}` },
	// 		})
	// 		.then((res) => {
	// 			setUser(res.data);
	// 			// console.log(res.data);
	// 		})
	// 		.catch((err) => {
	// 			console.log("무언가 잘못됐다.");
	// 		});
	// };

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
					path="/appraisal"
					render={() => {
						return <Appraisal />;
					}}
				/>
				<Route
					exact
					path="/appraisal/:id"
					render={() => {
						return <AppraisalContent />;
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
					exact
					authenticated={user.authenticated}
					path="/mypage"
					component={MyPage}
					user={user}
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
					path="/shop/:id"
					render={() => {
						return <ShopContent />;
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
