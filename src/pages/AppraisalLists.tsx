import React, {useState} from "react";
import { Link, withRouter } from "react-router-dom";
import AppraisalAllList from "../components/AppraisalAllList"
import "../css/CategoryList.css"


function AppraisalList() {

	const CategoryButton: Array<string> = [
        "전체", "악세사리", "피규어", "스티커", "장난감", "줘도 안가지는", "도저히 분류하기 힘든", "옛날 화폐", "음식"
        ,"의류","가구","반려동물","책","악기","꽃","알코올","화장품","방향제","전자기기","핸드 메이드"
	];
	
	const [categoryName, setcategoryName] = useState<string>("");

	const categoryButtonClick = (name: string):void => {
		setcategoryName(name)
	}

	return (
		<div>
			<section className="CategoryList">
            <div className="CategoryList__title">카테고리</div>
            <div className="CategoryList__buttonBox">
                {CategoryButton.map((CategoryButton) => (
					<button className="CategoryList__buttonBox__button" key={CategoryButton}
						onClick={() => {categoryButtonClick(CategoryButton)}} value={CategoryButton}
						># {CategoryButton}</button>
                ))}
            </div>
        </section>
			<AppraisalAllList CategoryName={categoryName}   />
		</div>
	);
}

export default withRouter(AppraisalList);
