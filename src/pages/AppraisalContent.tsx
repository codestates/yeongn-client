import React from "react";
import { Link, withRouter } from "react-router-dom";
import AppraisalContents from "../components/AppraisalContents";
import AppraisalComment from "../components/AppraisalComment";
import Header from "../components/Header";
function AppraisalContent() {
	const initialState = [
		{
			id: 1,
			name: "우리 엄마 김치",
			price: 12000,
			category: "음식",
		},
	];

	return (
		<div>
			<AppraisalContents />
			<AppraisalComment />
		</div>
	);
}

export default withRouter(AppraisalContent);
