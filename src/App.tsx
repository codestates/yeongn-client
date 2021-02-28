import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Appraisal from "./pages/Appraisal";
import AppraisalContent from "./pages/AppraisalContent";
import AppraisalList from "./pages/AppraisalLists";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import RegisterAppraisal from "./pages/RegisterAppraisal";
import RegisterSale from "./pages/RegisterSale";
import Search from "./pages/Search";
import Shop from "./pages/Shop";
import ShopContent from "./pages/ShopContent";
import ShopList from "./pages/ShopList";

function App() {
	return (
		<Router>
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
				<Route
					exact
					path="/login"
					render={() => {
						return <Login />;
					}}
				/>
				<Route
					exact
					path="/mypage"
					render={() => {
						return <MyPage />;
					}}
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
