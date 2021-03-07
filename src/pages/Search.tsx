import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface MatchParams {
	input: string;
}

function Search({ match }: RouteComponentProps<MatchParams>) {
	return (
		<div>
			{/* 밑에 h1 삭제하고 컴포넌트 입력하기 */}
			<h1>{match.params.input}</h1>
			{/* todo */}
		</div>
	);
}

export default withRouter(Search);
