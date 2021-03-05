import React, { useState } from "react";
import "../styles/AppraisalLists.css";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import "../styles/ShopCategory.css";

type CategoryButtonClickProps = {
	setCategoryTitle: (CategoryTitle: string) => void;
};

function ShopCategory({ setCategoryTitle }: CategoryButtonClickProps) {
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
			".ShopCategoryList__buttonBox__buttonActive",
		);
		if (e.target.className === "ShopCategoryList__buttonBox__button") {
			e.target.className = "ShopCategoryList__buttonBox__buttonActive";
		}
		CategoryButtons.forEach((el) => {
			if (el.innerHTML !== `# ${categoryTitle}`) {
				el.className = "ShopCategoryList__buttonBox__button";
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
		<section className="ShopCategoryList">
			<div className="ShopCategoryList__title__wrap">
				<span className="ShopCategoryList__title">카테고리</span>
				{!categoryMore ? (
					<button className="ShopCategoryList__more__down">
						<ArrowDropDownIcon
							fontSize="inherit"
							onClick={moreCategoryButtonDown}
						/>
					</button>
				) : (
					<button className="ShopCategoryList__more__up">
						<ArrowDropUpIcon
							fontSize="inherit"
							onClick={moreCategoryButtonUp}
						/>
					</button>
				)}
			</div>
			<div className="ShopCategoryList__buttonBox">
				{!categoryMore ? (
					CategoryButton.map((CategoryButton) => (
						<button
							className="ShopCategoryList__buttonBox__button"
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
							className="ShopCategoryList__buttonBox__button__modal"
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

export default ShopCategory;
