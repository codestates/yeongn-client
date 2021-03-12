import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import AppraisalCategory from "../components/AppraisalCategory";
import AppraisalAllList from "../components/AppraisalAllList";
import ScrollToTop from "../components/ScrollToTop";
import ArrowUp from "../components/ArrowUp";

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

function AppraisalList() {
	const [categoryTitle, setCategoryTitle] = useState<string>("전체 감정가");
	const [appraisalList, setAppraisalList] = useState<List[]>([]);

	useEffect(() => {
		axios
			.get(`https://www.yeongn.com/api/appraisal`)
			.then((res) => {
				setAppraisalList(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div>
			<ScrollToTop />
			<AppraisalCategory
				setCategoryTitle={setCategoryTitle}
				setAppraisalList={setAppraisalList}
			/>
			<AppraisalAllList
				categoryTitle={categoryTitle}
				appraisalList={appraisalList}
			/>
			<ArrowUp />
		</div>
	);
}

export default withRouter(AppraisalList);
