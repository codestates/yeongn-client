import React, { useState, useEffect } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import "../styles/MyPageRequest.css";
import axios from "axios";
import soSad from "../assets/img/sosad.png";

interface User {
	userId: string;
	token: string;
	authenticated: boolean;
}
interface IMypageUser extends RouteComponentProps {
	user: User;
}

function MyPageRequest({ user }: IMypageUser) {
	useEffect(() => {
		const getUrl = "https://www.yeongn.com/api/user";
		const config = {
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		};
		axios
			.get(getUrl, config)
			.then((res) => {
				setList(res.data.appraisals);
				console.log(res.data.appraisals);
				console.log(res.data);
			})
			.catch((err) => {
				alert(err);
			});
	}, []);
	const [appraisalList, setList] = useState([]);
	return (
		<div className="mypage__request">
			<div className="request__title__container">
				<div className="request__title">나의 감정 요청 리스트</div>
				<Link to="/mypage/request" className="request__title__addLink">
					리스트 더보기
				</Link>
			</div>
			<div className="request__img__container">
				{appraisalList.length === 0 ? (
					<div className="request__none">
						<img className="request__none__img" src={soSad} alt="쏘샏" />
						<div className="request__none__title">
							감정 요청하신 물품이 없네요.
						</div>
						<button className="mypage__goappraisal__btn">
							<Link to="/appraisal">감정소 바로가기</Link>
						</button>
					</div>
				) : (
					appraisalList.slice(0, 8).map((appraisal: any) => (
						<Link to={`/appraisal/${appraisal.id}`} key={appraisal.id}>
							<img
								className="request__img"
								src={appraisal.imgUrl}
								alt={appraisal.itemName}
							/>
							<div className="request__img__name">{appraisal.itemName}</div>
						</Link>
					))
				)}
			</div>
		</div>
	);
}

export default withRouter(MyPageRequest);
