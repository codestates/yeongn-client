import React from "react";
import { Link, withRouter } from "react-router-dom";
import ShopContents from "../components/ShopContents";
import ShopComment from "../components/ShopComment";
import ScrollToTop from "../components/ScrollToTop";
function ShopContent() {
	return (
		<div>
			<ScrollToTop />
			<ShopContents />
			<ShopComment />
		</div>
	);
}

export default withRouter(ShopContent);
