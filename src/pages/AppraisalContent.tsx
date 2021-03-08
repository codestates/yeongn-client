import React from "react";
import { withRouter } from "react-router-dom";
import AppraisalContents from "../components/AppraisalContents";
import AppraisalComment from "../components/AppraisalComment";
import ScrollToTop from "../components/ScrollToTop";
function AppraisalContent() {
	return (
		<div>
			<ScrollToTop />
			<AppraisalContents />
			<AppraisalComment />
		</div>
	);
}

export default withRouter(AppraisalContent);
