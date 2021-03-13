import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import "../styles/Appraisal.css";
import AppraisalHighPrice from "../components/AppraisalHighPrice";
import AppraisalPopularity from "../components/AppraisalPopularity";
import ScrollToTop from "../components/ScrollToTop";
import ArrowUp from "../components/ArrowUp";
import Loading from "../components/Loading";

interface List {
	average: number;
	category: string;
	createdAt: string;
	description: string;
	id: number;
	imgUrl: string;
	itemName: string;
	likeCount: number;
	nickname: string;
	userId: number;
	userPrice: string;
	usersAppraisalsPrices: {};
}

function Appraisal() {
	const [appraisalList, setAppraisalList] = useState<any>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		axios
			.get(`/api/appraisal`)
			.then((res) => {
				setIsLoading(true);
				setAppraisalList(res.data);
			})
			.catch((err) => alert(err));
	}, []);

	return (
		<div>
			{!isLoading || !appraisalList ? <Loading /> : null}
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
			<ArrowUp />
			<ScrollToTop />
		</div>
	);
}

export default withRouter(Appraisal);
