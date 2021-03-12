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
	setContentId: (e: any) => void;
}

function ShopContent({ user, setContentId }: IMypageUser) {
	return (
		<div>
			<ScrollToTop />
			<ShopContents user={user} setContentId={setContentId} />
			<ShopComment user={user} />
		</div>
	);
}

export default withRouter(ShopContent);
