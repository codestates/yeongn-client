import React from "react";
import { Link, withRouter } from "react-router-dom";
import AppraisalHighPrice from "../components/AppraisalHighPrice";
import AppraisalPopularity from "../components/AppraisalPopularity";
import "../styles/Appraisal.css";
import ScrollToTop from "../components/ScrollToTop";

function Appraisal() {
	return (
		<div>
			<ScrollToTop />
			<section className="Appraisal__main">
				<div className="Appraisal__main__container">
					<div className="Appraisal__main__image"></div>
					<div className="Appraisal__main__wrap">
						<div className="Appraisal__main__title">믿을 수 있는 감정!</div>
						<Link to={`/register/appraisal`}>
							<button className="Appraisal__main__button">
								즉시 나의 물건 감정하러 가기
							</button>
						</Link>
					</div>
				</div>
			</section>
			<AppraisalHighPrice />
			<div className="Appraisal__division__line"></div>
			<AppraisalPopularity />
			<div className="Appraisal__division__line"></div>
		</div>
	);
}

export default withRouter(Appraisal);
