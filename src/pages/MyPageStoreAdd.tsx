import React, { useState, useEffect } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import Footer from "../components/Footer";
import ArrowUp from "../components/ArrowUp";
import MyProfile from "../components/MyPageProfile";
import ScrollToTop from "../components/ScrollToTop";
import "../styles/MyPageAdd.css";
import axios from "axios";
import soSad from "../assets/img/sosad.png";
/**
 * userid로 스토어 리스트 받아오기 //! axios요청
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
function MyPageStoreAdd({ user }: IMypageUser) {
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
				setList(res.data.sales);
				console.log(res.data.sales);
				console.log(res.data);
			})
			.catch((err) => {
				alert(err);
			});
	}, []);
	const [saleList, setList] = useState([]);

	return (
		<div id="mypage__add">
			<ScrollToTop />
			<section className="mypage__add__container">
				<MyProfile user={user} />
				<div className="add__title__container">
					<div className="add__title">나의 판매 리스트</div>
				</div>
				<div className="add__img__container">
					{saleList.length === 0 ? (
						<div className="request__none">
							<img className="request__none__img" src={soSad} alt="토이" />
							<div className="request__none__title">
								판매하신 상품이 없네요.
							</div>
							<button className="mypage__goshop__btn">
								<Link to="/shop">상점 바로가기</Link>
							</button>
						</div>
					) : (
						saleList.map((sale: any) => (
							<Link to={`/shop/${sale.id}`} key={sale.id}>
								<img
									className="store__img"
									src={sale.imgUrl}
									alt={sale.itemName}
								/>
								<div className="request__img__name">{sale.itemName}</div>
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

export default withRouter(MyPageStoreAdd);
