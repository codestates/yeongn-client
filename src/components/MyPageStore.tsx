import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import "../styles/MyPageStore.css";
import soSad from "../assets/img/sosad.png";
/**
 *
 * 가져올 것 userId 이걸로 axios요청으로 자신이 남긴 감정기록을
 * 조회함
 */
interface User {
	userId: string;
	token: string;
	authenticated: boolean;
}
interface IMypageUser extends RouteComponentProps {
	user: User;
}
function MyPageStore({ user }: IMypageUser) {
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
		<div className="mypage__store">
			<div className="store__title__container">
				<div className="store__title">나의 판매 리스트</div>
				<Link to="/mypage/shop" className="store__title__addLink">
					리스트 더보기
				</Link>
			</div>
			<div className="store__img__container">
				{saleList.length === 0 ? (
					<div className="request__none">
						<img className="request__none__img" src={soSad} alt="토이" />
						<div className="request__none__title">판매하신 상품이 없네요.</div>
						<button className="mypage__goshop__btn">
							<Link to="/shop">상점 바로가기</Link>
						</button>
					</div>
				) : (
					saleList.slice(0, 8).map((sale: any) => (
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
		</div>
	);
}

export default withRouter(MyPageStore);
