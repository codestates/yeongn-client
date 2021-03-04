import React from "react";
import { Route, Redirect } from "react-router-dom";

interface AuthProps {
	authenticated: Boolean;
	renderComponent: Function;
	path: string;
}
//제발 성공하자!
function AuthRoute({ authenticated, renderComponent, path }: AuthProps) {
	return (
		<Route
			path={path}
			render={(props) =>
				authenticated ? (
					renderComponent(props)
				) : (
					<Redirect
						to={{ pathname: "/login", state: { from: props.location } }}
					/>
				)
			}
		/>
	);
}

export default AuthRoute;
