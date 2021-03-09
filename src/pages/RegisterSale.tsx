import { ContactlessOutlined } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

interface fileForm {
	file: any;
}

interface User extends RouteComponentProps {
	userId: string;
	userEmail: string;
	authenticated: boolean;
}

function RegisterSale() {
	return <form id="registe__store__section">글양식 만들 예정입니다.</form>;
}

export default withRouter(RegisterSale);
