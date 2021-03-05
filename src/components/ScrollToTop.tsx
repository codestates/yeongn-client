import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

function ScrollToTop() {
	useEffect(() => {
		window.scroll({
			top: 0,
			left: 0,
		});
	});
	return null;
}

export default withRouter(ScrollToTop);
