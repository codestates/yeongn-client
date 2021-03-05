import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Appraisal from "./pages/Appraisal";
import AppraisalContent from "./pages/AppraisalContent";
import AppraisalList from "./pages/AppraisalLists";
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

function App() {
	const [user, setUser] = useState({});
	const [accessToken, setToken] = useState("");

	const url = ``;

	// const loginHandler = (userData:any)=> {
	// 	setUser(userData);
	// }

	const logoutHandler = () => {
		setUser({});
	};

	const issueAccessToken = (token: string) => {
		setToken(token);
		axios
			.get("https://s.nugathesam.com/users", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => {
				setUser(res.data);
				// console.log(res.data);
			})
			.catch((err) => {
				console.log("무언가 잘못됐다.");
			});
	};

	const userInfo = {
		userId: "김창민",
		authenticated: false,
	};

	return (
		<Router>
			<Header user={userInfo} />
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
						return <Login issueAccessToken={issueAccessToken} />;
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
					authenticated={userInfo.authenticated}
					path="/mypage"
					component={MyPage}
					user={userInfo}
				/>
				<AuthRoute
					authenticated={userInfo.authenticated}
					exact
					path="/mypage/request"
					component={MyPageRequestAdd}
					user={userInfo}
				/>
				<AuthRoute
					exact
					authenticated={userInfo.authenticated}
					path="/mypage/shop"
					component={MyPageStoreAdd}
					user={userInfo}
				/>
				<AuthRoute
					exact
					authenticated={userInfo.authenticated}
					path="/mypage/likes"
					component={MyPageLikesAdd}
					user={userInfo}
				/>

				<Route
					exact
					path="/register/appraisal"
					render={() => {
						return <RegisterAppraisal />;
					}}
				/>
				<Route
					exact
					path="/register/shop"
					render={() => {
						return <RegisterSale />;
					}}
				/>
				<Route
					exact
					path="/search"
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
