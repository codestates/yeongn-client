import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import SearchAppraisalList from "../components/SearchAppraisalList";
import SearchShopList from "../components/SearchShopList";
interface MatchParams {
	input: string;
}

function Search({ match }: RouteComponentProps<MatchParams>) {
	const word = match.params.input;

	return (
		<div>
			<SearchAppraisalList word={word} />
			<SearchShopList word={word} />
		</div>
	);
}

export default withRouter(Search);
