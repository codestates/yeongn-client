import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import ShopContents from "../components/ShopContents";
import ShopComment from "../components/ShopComment";
import ScrollToTop from "../components/ScrollToTop";
interface User {
	userId: string;
	token: string;
	authenticated: boolean;
}
interface IMypageUser extends RouteComponentProps {
	user: User;
}

function ShopContent({ user }: IMypageUser) {
	return (
		<div>
			<ScrollToTop />
			<ShopContents user={user} />
			<ShopComment user={user} />
		</div>
	);
}

export default withRouter(ShopContent);
