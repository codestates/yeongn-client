import React, { useEffect, useState } from "react";
import Loa from "../assets/img/Loading.gif";
import "../styles/Loading.css";
function Loading() {
	return (
		<div className="LoadingContainer">
			<div className="LoadingWrap">
				<img className="Loading" src={Loa} />
				<div className="LoadingBackground">로딩중</div>
			</div>
		</div>
	);
}

export default Loading;
