import React, { useState } from "react";
import axios from "axios";
import "../styles/AppraisalCategory.css";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

type CategoryButtonClickProps = {
	setCategoryTitle: (CategoryTitle: string) => void;
	setAppraisalList: (e: any) => void;
};

function AppraisalCategory({
	setCategoryTitle,
	setAppraisalList,
}: CategoryButtonClickProps) {
	const CategoryButton: Array<string> = [
		"전체",
		"높은 가격",
		"낮은 가격",
		"인기 많은",
		"줘도 안 가지는",
		"도저히 분류하기 힘든",
		"꽃",
		"책",
		"음식",
		"의류",
		"가구",
		"악기",
		"게임",
		"알코올",
		"장난감",
		"피규어",
		"화장품",
		"악세사리",
		"인테리어",
		"전자기기",
		"핸드 메이드",
	];

	const [categoryMore, setCategoryMore] = useState<boolean>(false);

	const categoryButtonClick = (categoryTitle: string, e: any): void => {
		setCategoryTitle(categoryTitle);

		const CategoryButtons = document.querySelectorAll(
			".CategoryList__buttonBox__buttonActive",
		);
		if (e.target.className === "CategoryList__buttonBox__button") {
			e.target.className = "CategoryList__buttonBox__buttonActive";
		}
		CategoryButtons.forEach((el) => {
			if (el.innerHTML !== `# ${categoryTitle}`) {
				el.className = "CategoryList__buttonBox__button";
			}
		});

		if (categoryTitle === "전체" || categoryTitle === "전체 감정가") {
			axios.get(`https://www.yeongn.com/api/appraisal`).then((res) => {
				setAppraisalList(res.data);
				console.log(res.data);
			});
		} else if (categoryTitle === "높은 가격") {
			axios.get(`https://www.yeongn.com/api/appraisal`).then((res) => {
				const highPriceData = res.data.sort(function (a: any, b: any) {
					return a.average < b.average ? 1 : -1;
				});
				setAppraisalList(highPriceData);
			});
		} else if (categoryTitle === "낮은 가격") {
			axios.get(`https://www.yeongn.com/api/appraisal`).then((res) => {
				const highPriceData = res.data.sort(function (a: any, b: any) {
					return a.average > b.average ? 1 : -1;
				});
				setAppraisalList(highPriceData);
			});
		} else if (categoryTitle === "인기 많은") {
			axios.get(`https://www.yeongn.com/api/appraisal`).then((res) => {
				const LikeCount = res.data.sort(function (a: any, b: any) {
					return a.likeCount < b.likeCount ? 1 : -1;
				});
				setAppraisalList(LikeCount);
			});
		} else {
			axios.get(`https://www.yeongn.com/api/appraisal`).then((res) => {
				const filterdata = res.data.filter(
					(el: any) => el.category === categoryTitle,
				);
				setAppraisalList(filterdata);
			});
		}
	};

	const moreCategoryButton = (): void => {
		setCategoryMore(!categoryMore);
	};
	return (
		<section className="CategoryList">
			<div className="CategoryList__title__wrap">
				<span className="CategoryList__title">카테고리</span>
				{!categoryMore ? (
					<button className="CategoryList__more__down">
						<ArrowDropDownIcon
							fontSize="inherit"
							onClick={moreCategoryButton}
						/>
					</button>
				) : (
					<button className="CategoryList__more__up">
						<ArrowDropUpIcon fontSize="inherit" onClick={moreCategoryButton} />
					</button>
				)}
			</div>
			<div className="CategoryList__buttonBox">
				{!categoryMore ? (
					CategoryButton.map((CategoryButton) => (
						<button
							className="CategoryList__buttonBox__button"
							key={CategoryButton}
							onClick={(e) => categoryButtonClick(CategoryButton, e)}
							value={CategoryButton}
						>
							# {CategoryButton}
						</button>
					))
				) : (
					<div></div>
				)}
				{!categoryMore ? (
					CategoryButton.map((CategoryButton) => (
						<button
							className="CategoryList__buttonBox__button__modal"
							key={CategoryButton}
							onClick={(e) => {
								categoryButtonClick(CategoryButton, e);
							}}
							value={CategoryButton}
						>
							{CategoryButton}
						</button>
					))
				) : (
					<div></div>
				)}
			</div>
		</section>
	);
}

export default AppraisalCategory;
