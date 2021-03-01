import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import yeongnLogo from "../assets/img/yeongnLogo1.png";
import StorefrontIcon from "@material-ui/icons/Storefront";
import CreateIcon from "@material-ui/icons/Create";
import "../styles/Header.css";
// type isLogin = {
//   isLogin: boolean;
//   userId: string;
// };
function Header() {
	const [isLogin, setLogin] = useState(true);
	const [id, setId] = useState("lovvp");

	return (
		<section className="header">
			<div className="header__container">
				<img src={yeongnLogo} alt="yeongnLogo" className="header__logo" />
				{/* 컴포넌트 Search.tsx로 변경예정 */}
				<div className="header__search">
					<input
						type="text"
						placeholder="검색어를 입력하세요"
						className="header__search__input"
					/>
					{/* 검색어 상태는 전역에서 관리해야함;; */}
					<Link to="search">
						<button className="header__search__button">
							<SearchIcon />
						</button>
					</Link>
				</div>
				<div className="header__menu__link">
					<Link to="/appraisal" className="header__menu__link__button">
						<CreateIcon />
						<div>감정소</div>
					</Link>
					<Link to="/shop" className="header__menu__link__button">
						<StorefrontIcon />
						<div>상점</div>
					</Link>
				</div>
				{isLogin ? (
					<div className="header__menu__login">
						<Link to="/mypage" className="header__menu__button">
							마이페이지
						</Link>
						<button className="header__menu__button">로그아웃</button>
					</div>
				) : (
					<Link to="/login" className="header__menu__button login">
						로그인
					</Link>
				)}
			</div>
		</section>
	);
}

export default withRouter(Header);
