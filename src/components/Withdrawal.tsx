import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import axios from "axios";
import "../styles/withdrawal.css";

interface User {
	userId: string;
	token: string;
	authenticated: boolean;
}
interface IMypageUser extends RouteComponentProps {
	user: User;
	handleUserdata: () => void;
}

function Withdrawal({ handleUserdata, history, user }: IMypageUser) {
	const deleteContent = () => {
		const result = window.confirm(
			"회원탈퇴를 하시면 기존의 모든 게시물과 댓글들이 영구삭제 됩니다. 정말로 삭제하시겠습니까?",
		);
		if (result) {
			axios
				.delete(`/api/user`, {
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				})
				.then(() => {
					history.push("/");
					handleUserdata();
				})
				.catch((err) => alert(err));
		} else {
			return;
		}
	};

	return (
		<div id="withdrawal__section">
			<div className="whithdrawal__title">
				더이상 연근마켓을 이용하기 싫으시다면?
			</div>
			<button className="withdrawal__btn" onClick={deleteContent}>
				회원탈퇴 바로가기
			</button>
		</div>
	);
}

export default withRouter(Withdrawal);
