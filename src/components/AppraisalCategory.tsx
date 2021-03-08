import React, { useState } from "react";
import "../styles/AppraisalLists.css";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import "../styles/AppraisalCategory.css";

type CategoryButtonClickProps = {
	setCategoryTitle: (CategoryTitle: string) => void;
};

function AppraisalCategory({ setCategoryTitle }: CategoryButtonClickProps) {
	const CategoryButton: Array<string> = [
		"전체",
		"높은 가격",
		"낮은 가격",
		"인기 많은",
		"줘도 안 가지는",
		"도저히 분류하기 힘든",
		"음식",
		"의류",
		"가구",
		"악기",
		"알코올",
		"게임",
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
	};

	const moreCategoryButtonUp = (): void => {
		setCategoryMore(false);
	};

	const moreCategoryButtonDown = (): void => {
		setCategoryMore(true);
	};

	return (
		<section className="CategoryList">
			<div className="CategoryList__title__wrap">
				<span className="CategoryList__title">카테고리</span>
				{!categoryMore ? (
					<button className="CategoryList__more__down">
						<ArrowDropDownIcon
							fontSize="inherit"
							onClick={moreCategoryButtonDown}
						/>
					</button>
				) : (
					<button className="CategoryList__more__up">
						<ArrowDropUpIcon
							fontSize="inherit"
							onClick={moreCategoryButtonUp}
						/>
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
