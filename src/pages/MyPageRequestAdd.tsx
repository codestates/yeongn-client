import React, { useState, useEffect } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import Footer from "../components/Footer";
import ArrowUp from "../components/ArrowUp";
import MyProfile from "../components/MyPageProfile";
import "../styles/MyPageAdd.css";
import ScrollToTop from "../components/ScrollToTop";
import soSad from "../assets/img/sosad.png";
import axios from "axios";
/**
 * userid로 감정소 리스트 받아오기 //! axios요청
 * !게시글 페이징 함수 만들기
 */
interface User {
	userId: string;
	token: string;
	authenticated: boolean;
}
interface IMypageUser extends RouteComponentProps {
	user: User;
}

function MyPageRequestAdd({ user }: IMypageUser) {
	useEffect(() => {
		const getUrl = "/api/user";
		const config = {
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		};
		axios
			.get(getUrl, config)
			.then((res) => {
				setList(res.data.appraisals.reverse());
			})
			.catch((err) => {
				alert(err);
			});
	}, []);
	const [appraisalList, setList] = useState([]);
	return (
		<div id="mypage__add">
			<ScrollToTop />
			<section className="mypage__add__container">
				<MyProfile user={user} />
				<div className="add__title__container">
					<div className="add__title">나의 감정 요청 리스트</div>
				</div>
				<div className="add__img__container">
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
						appraisalList.map((appraisal: any) => (
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
			</section>
			<Footer />
			<ArrowUp />
		</div>
	);
}

export default withRouter(MyPageRequestAdd);
