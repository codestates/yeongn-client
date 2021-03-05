import React from "react";
import { Link, withRouter } from "react-router-dom";
import ShopContents from "../components/ShopContents";
import ShopComment from "../components/ShopComment";
function ShopContent() {
	return (
		<div>
			<ShopContents />
			<ShopComment />
		</div>
	);
}

export default withRouter(ShopContent);
