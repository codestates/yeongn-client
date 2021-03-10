import React, { useState, useEffect, useRef } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import yeongnLogo from "../assets/img/yeongnLogo1.png";
import StorefrontIcon from "@material-ui/icons/Storefront";
import CreateIcon from "@material-ui/icons/Create";
import MenuIcon from "@material-ui/icons/Menu";
import "../styles/Header.css";
import usePrevious from "../components/usePrevious";

interface User {
	userId: string;
	authenticated: boolean;
}
interface IMypageUser extends RouteComponentProps {
	user: User;
}

const initialState = [
	{
		id: 1,
		name: "노른자 분리기",
		price: 9900,
		category: "장난감",
		nick: "제킴",
	},
	{
		id: 2,
		name: "우리 엄마 김치",
		price: 12000,
		category: "음식",
		nick: "제킴",
	},
	{
		id: 3,
		name: "건담",
		price: 290000,
		category: "피규어",
		nick: "코공",
	},
	{
		id: 4,
		name: "뜯어온 보도블럭",
		price: 4900000,
		category: "줘도 안 가지는",
		nick: "코공",
	},
	{
		id: 5,
		name: "칼라 립스틱",
		price: 29000000,
		category: "화장품",
		nick: "빵맨",
	},
	{
		id: 6,
		name: "잉어 슈즈",
		price: 39000000,
		category: "의류",
		nick: "빵맨",
	},
	{
		id: 7,
		name: "웰컴 매트",
		price: 690000000,
		category: "도저히 분류하기 힘든",
		nick: "지땅",
	},
	{
		id: 8,
		name: "멋진 의자",
		price: 9900,
		category: "가구",
		nick: "지땅",
	},
	{
		id: 9,
		name: "카스",
		price: 991200,
		category: "맥주",
		nick: "제킴",
	},
	{
		id: 10,
		name: "갤럭시 노트 10+",
		price: 12200,
		category: "전자기기",
		nick: "코공",
	},
	{
		id: 11,
		name: "내가 만든 꽃",
		price: 200,
		category: "꽃",
		nick: "빵맨",
	},
	{
		id: 12,
		name: "책1",
		price: 991200,
		category: "책",
		nick: "지땅",
	},
	{
		id: 13,
		name: "코공",
		price: 9922312300,
		category: "도저히 분류하기 힘든",
		nick: "지땅",
	},
];
function Header({ user, location }: IMypageUser) {
	const [isLogin, setLogin] = useState(true);
	const [id, setId] = useState("lovvp");
	const [toggleState, setToggle] = useState(true);
	const [searchData, setSearchData] = useState<any>([]);
	const toggleBtnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		setToggle(!toggleState);
	};
	const input = useRef<HTMLInputElement>(null);
	const [searchInput, setSearch] = useState("");

	const handleFilterDataBtn = () => {
		const filter = initialState.filter((el) => el.name.includes(searchInput));
		setSearchData(filter);
	};

	const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setSearch(e.target.value);
	};
	const onReset = (): void => {
		if (input.current) {
			input.current.value = "";
		}
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
							onChange={handleChangeSearch}
							ref={input}
						/>
						{/* 검색어 상태는 전역에서 관리해야함;; */}
						<Link to={`/search/${searchInput}`}>
							<button
								className="header__menu__search__button"
								onClick={handleFilterDataBtn}
							>
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
