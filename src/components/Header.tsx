import React, { useState, useEffect, useRef } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import yeongnLogo from "../assets/img/yeongnLogo1.png";
import StorefrontIcon from "@material-ui/icons/Storefront";
import CreateIcon from "@material-ui/icons/Create";
import MenuIcon from "@material-ui/icons/Menu";
import "../styles/Header.css";
import usePrevious from "../components/usePrevious";
import Cookies from "js-cookie";

interface User {
	userId: string;
	token: string;
	authenticated: boolean;
}
interface IMypageUser extends RouteComponentProps {
	user: User;
	logoutHandler: () => void;
}

function Header({ logoutHandler, user, location, history }: IMypageUser) {
	const [isLogin, setLogin] = useState(true);
	const [id, setId] = useState("lovvp");
	const [toggleState, setToggle] = useState(true);
	const [searchData, setSearchData] = useState<any>([]);
	const toggleBtnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		setToggle(!toggleState);
	};
	const input = useRef<HTMLInputElement>(null);
	const [searchInput, setSearch] = useState("");

	const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setSearch(e.target.value);
	};
	const onReset = (): void => {
		if (input.current) {
			input.current.value = "";
		}
	};
	const handleLogoutClick = () => {
		history.push("/");
		logoutHandler();
	};
	const prevHistory = usePrevious(location.pathname);
	useEffect(() => {
		if (user.authenticated) {
			setLogin(true);
			if (prevHistory !== location.pathname) {
				setToggle(true);
				onReset();
			}
		} else {
			setLogin(false);
			if (prevHistory !== location.pathname) {
				setToggle(true);
				onReset();
			}
		}
	});

	const handleKeyPress = (e: any) => {
		if (e.key === "Enter") {
			searchBtn();
		}
	};
	const searchBtn = () => {
		history.push(`/search/`);
		setTimeout(() => {
			history.push(`/search/${searchInput}`);
		}, 0);
	};

	return (
		<div className="header">
			<div className="header__container">
				<Link to="/" className="header__logo">
					<img src={yeongnLogo} alt="yeongnLogo" />
				</Link>
				<div className={toggleState ? "header__menu" : "header__menu open"}>
					<div className="header__menu__search">
						<input
							type="text"
							placeholder="검색어를 입력하세요"
							className="header__menu__search__input"
							onChange={handleChangeSearch}
							ref={input}
							onKeyPress={handleKeyPress}
						/>
						{/* <Link to={`/search/${searchInput}`}> */}
						<button
							className="header__menu__search__button"
							onClick={searchBtn}
						>
							<SearchIcon />
						</button>
						{/* </Link> */}
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
							<button
								className="header__menu__link__button"
								onClick={handleLogoutClick}
							>
								로그아웃
							</button>
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
