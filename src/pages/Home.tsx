import React from "react";
import { Link, withRouter } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ArrowUp from "../components/ArrowUp";
import "../styles/Home.css";
import toy from "../assets/img/toy.png";
import lucky from "../assets/img/lucky.png";
import donthave from "../assets/img/idonthave.png";
import CreateIcon from "@material-ui/icons/Create";
import StorefrontIcon from "@material-ui/icons/Storefront";
function Home() {
	return (
		<div id="home">
			<Header />
			<section className="home__appraisal">
				<div className="home__appraisal__container">
					<div className="home__appraisal__img">
						<img src={toy} alt="토이" />
					</div>
					<div className="home__appraisal__contents">
						<h2 className="home__appraisal__contents__title">
							당신만의 아이템을
							<br />
							감정받아보세요.
						</h2>
						<h3 className="home__appraisal__contents__description">
							방구석 전문가들이 당신의 물건에 대한
							<br />
							감정가를 책정해 줍니다.
						</h3>
						<Link to="appraisal" className="home__appraisal__contents__button">
							<div className="appraisal__button__icon">
								<CreateIcon fontSize="inherit" />
							</div>
							감정소
						</Link>
					</div>
				</div>
			</section>
			<section className="home__store">
				<div className="home__store__container">
					<div className="home__store__contents">
						<h2 className="home__store__contents__title">
							내 물건의 가치가 이정도?
							<br />
							상점에 판매하세요!
						</h2>
						<h3 className="home__store__contents__description">
							이런걸 누가 사?
							<br />
							필요한 누군가가 있을 수 있어요.
							<br />
							상점에 판매해 봅시다!
						</h3>
						<Link to="shop" className="home__store__contents__button">
							<div className="store__button__icon">
								<StorefrontIcon fontSize="inherit" />
							</div>
							<div>상점</div>
						</Link>
					</div>
					<div className="home__store__img">
						<img src={lucky} alt="토이" />
					</div>
				</div>
			</section>
			<section className="home__category">
				<div className="home__category__container">
					<div className="home__category__img">
						<img src={donthave} alt="토이" />
					</div>
					<div className="home__category__contents">
						<h2 className="home__category__contents__title">
							다양한 카테고리로
							<br />
							재밌는 물건을 찾아보세요.
						</h2>
						<h3 className="home__category__contents__description">
							왜 나만 없어? 😭
							<br />
							더 이상 슬퍼하지 말고
							<br />
							당신을 위한 아이템을 찾아보아요.
						</h3>
						<ul className="home__category__button__container">
							<li className="home__category__button">#골동품</li>
							<li className="home__category__button">#엄마요리솜씨</li>
							<li className="home__category__button">#줘도안씀</li>
							<li className="home__category__button">#책</li>
							<li className="home__category__button">#키덜트</li>
							<li className="home__category__button">#귀멸의칼날</li>
							<li className="home__category__button">#피규어</li>
						</ul>
					</div>
				</div>
			</section>
			<Footer />
			<ArrowUp />
		</div>
	);
}

export default withRouter(Home);
