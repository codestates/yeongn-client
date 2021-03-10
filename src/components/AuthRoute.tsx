import React from "react";
import { Route, Redirect } from "react-router-dom";

interface User {
	userId: string;
	token: string;
	authenticated: boolean;
}

interface AuthProps {
	authenticated: Boolean;
	path: string;
	exact: boolean;
	component: any;
	user: User;
}
//제발 성공하자!
function AuthRoute({
	authenticated,
	component: Component,
	user,
	...rest
}: AuthProps) {
	return (
		<Route
			{...rest}
			render={(props) =>
				authenticated ? (
					<Component {...props} user={user} />
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
