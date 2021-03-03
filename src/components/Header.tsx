import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import yeongnLogo from "../assets/img/yeongnLogo1.png";
import StorefrontIcon from "@material-ui/icons/Storefront";
import CreateIcon from "@material-ui/icons/Create";
import MenuIcon from "@material-ui/icons/Menu";
import "../styles/Header.css";
// type isLogin = {
//   isLogin: boolean;
//   userId: string;
// };

function Header() {
	const [isLogin, setLogin] = useState(true);
	const [id, setId] = useState("lovvp");
	const [toggleState, setToggle] = useState(true);
	let headerMenu = document.querySelector(".header__menu") as HTMLElement;
	const root = document.querySelector("#root") as HTMLElement;
	const toggleBtnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		setToggle(!toggleState);
	};

	return (
		<div className="header">
			<div className="header__container">
				<Link to="/" className="header__logo">
					<img src={yeongnLogo} alt="yeongnLogo" />
				</Link>
				{/* 컴포넌트 Search.tsx로 변경예정 */}
				<div className={toggleState ? "header__menu" : "header__menu open"}>
					<div className="header__menu__search">
						<input
							type="text"
							placeholder="검색어를 입력하세요"
							className="header__menu__search__input"
						/>
						{/* 검색어 상태는 전역에서 관리해야함;; */}
						<Link to="search">
							<button className="header__menu__search__button">
								<SearchIcon />
							</button>
						</Link>
					</div>
					{isLogin ? (
						<div className="header__menu__link">
							<Link to="/appraisal" className="header__menu__link__button">
								<div className="menu__link__button">
									<CreateIcon />
								</div>
								감정소
							</Link>
							<Link to="/shop" className="header__menu__link__button">
								<div className="menu__link__button">
									<StorefrontIcon />
								</div>
								상점
							</Link>
							<Link to="/mypage" className="header__menu__link__button">
								마이페이지
							</Link>
							<button className="header__menu__link__button">로그아웃</button>
						</div>
					) : (
						<div className="header__menu__link">
							<Link to="/appraisal" className="header__menu__link__button">
								<div className="menu__link__button">
									<CreateIcon />
								</div>
								감정소
							</Link>
							<Link to="/shop" className="header__menu__link__button">
								<div className="menu__link__button">
									<StorefrontIcon />
								</div>
								상점
							</Link>
							<Link to="/login" className="header__menu__link__button">
								로그인
							</Link>
						</div>
					)}
				</div>
				<div className="header__toggle-btn" onClick={toggleBtnClick}>
					<MenuIcon fontSize="inherit" />
				</div>
			</div>
		</div>
	);
}

export default withRouter(Header);
