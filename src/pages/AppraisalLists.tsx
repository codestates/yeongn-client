import React, {useEffect, useState} from "react";
import { Link, withRouter } from "react-router-dom";
import Header from "../components/Header"
import "../styles/AppraisalLists.css"
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
function AppraisalList() {

    const CategoryButton: Array<string> = [
        "전체", "높은 감정가", "낮은 감정가", "인기 많은", "줘도 안 가지는", "도저히 분류하기 힘든", "음식"
        , "의류", "가구", "악기", "알코올", "게임", "피규어", "화장품", "악세사리", "인테리어", "전자기기", "핸드 메이드",
    ];
	
    const initialState =
        [
            {
                id: 1,
                name: "노른자 분리기",
                price: 9900,
                category: "장난감"
            },
            {
                id: 2,
                name: "우리 엄마 김치",
                price: 12000,
                category: "음식"
            },
            {
                id: 3,
                name: "건담",
                price: 290000,
                category: "피규어"
            },
            {
                id: 4,
                name: "뜯어온 보도블럭",
                price: 4900000,
                category: "줘도 안 가지는"
            },
            {
                id: 5,
                name: "칼라 립스틱",
                price: 29000000,
                category: "화장품"
            },
            {
                id: 6,
                name: "잉어 슈즈",
                price: 39000000,
                category: "의류"
            },
            {
                id: 7,
                name: "웰컴 매트",
                price: 690000000,
                category: "도저히 분류하기 힘든"
            },
            {
                id: 8,
                name: "멋진 의자",
                price: 9900,
                category: "가구"
            },
            {
                id: 9,
                name: "카스",
                price: 991200,
                category: "맥주"
            },
            {
                id: 10,
                name: "갤럭시 노트 10+",
                price: 12200,
                category: "전자기기"
            },
            {
                id: 11,
                name: "내가 만든 꽃",
                price: 200,
                category: "꽃"
            },
            {
                id: 12,
                name: "책1",
                price: 991200,
                category: "책"
            },
            {
                id: 13,
                name: "코공",
                price: 9922312300,
                category: "도저히 분류하기 힘든"
            },
        ]

    const [appraisalList, setAppraisalList] = useState(initialState);
    const [categoryTitle, setCategoryTitle] = useState<string>("전체");
    const [count, setCount] = useState<number>(9);
    const [categoryMore, setCategoryMore] = useState<boolean>(false);

    const categoryButtonClick = (categoryTitle: string, e: any): void => {
       
        setCategoryTitle(categoryTitle)
        if (categoryTitle === "전체") {
            setAppraisalList(initialState)
        } else if (categoryTitle === "높은 감정가") {
            const highPriceData = appraisalList.sort(function (a, b) {
                return a.price < b.price ? 1 : -1;
            });
            setAppraisalList(highPriceData)
        } else if (categoryTitle === "낮은 감정가") {
            const highPriceData = appraisalList.sort(function (a, b) {
                return a.price > b.price ? 1 : -1;
            });
            setAppraisalList(highPriceData)
        } else {
            setAppraisalList(appraisalList.filter(el =>
                el.category === categoryTitle
            ))
        }
        
        const CategoryButtons = document.querySelectorAll(".CategoryList__buttonBox__buttonActive")
        if (e.target.className === "CategoryList__buttonBox__button") {
            e.target.className = "CategoryList__buttonBox__buttonActive"
        }
        CategoryButtons.forEach(el => {
                if (el.innerHTML !== `# ${categoryTitle}` ) {
                    el.className ="CategoryList__buttonBox__button"
                }
            })
    
}
    const moreButtonClick = ():void => {
        setCount(count => count + 6)
    }
    const moreCategoryButtonUp = ():void => {
        setCategoryMore(false);
    }
    const moreCategoryButtonDown = ():void => {
        setCategoryMore(true);
    }    

	return (
		<div>
			<Header/>
            <section className="CategoryList">
                <div className="CategoryList__title__wrap">
                    <span className="CategoryList__title">카테고리</span>
                {!categoryMore ? <button className="CategoryList__more__down">
                    <ArrowDropDownIcon fontSize="inherit" onClick={moreCategoryButtonDown} />
                    </button> : <button className="CategoryList__more__up">
                            <ArrowDropUpIcon fontSize="inherit" onClick={moreCategoryButtonUp} /></button>}
                </div>
                    <div className="CategoryList__buttonBox">
                    {!categoryMore ? 
                        CategoryButton.map((CategoryButton) => (
                            <button className="CategoryList__buttonBox__button" key={CategoryButton}
                                onClick={(e) => {categoryButtonClick(CategoryButton, e)}}
                                value={CategoryButton}
                            ># {CategoryButton}</button>
                        )) : <div></div>}
                    {!categoryMore ? 
                        CategoryButton.map((CategoryButton) => (
                            <button className="CategoryList__buttonBox__button__modal" key={CategoryButton}
                                onClick={(e) => { categoryButtonClick(CategoryButton, e) }} value={CategoryButton}
                            >{CategoryButton}</button>
                        )) : <div></div>}
                    </div>
        </section>
			<section className="appraisalAllList">
            <div className="appraisalAllList__title__wrap">
                <div className="appraisalAllList__title">
                    {`${categoryTitle} 리스트`}
                </div>
            </div>
                <div className="appraisalAllList__container">
                    {appraisalList.slice(0, count).map((appraisalList) => (
                    <div className="appraisalAllList__container__card" key={appraisalList.id}>
                    <Link to ={`/appraisal/${appraisalList.id}`} key={appraisalList.id}>
                    <div className="appraisalAllList__container__img">
                                이미지 입네다.
                    </div>
                        <div className="appraisalAllList__container__wrap">
                            <div className="appraisalAllList__container__title">{appraisalList.name}</div>
                                <span className="appraisalAllList__container__price">
                                    <span className="appraisalAllList__container__price">감정가 </span>
                                    {appraisalList.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 </span>
                        </div>
                            </Link>
                </div>
                )
                )}
                </div>
                <div className="appraisalAllList__container__moreButton">
                    <KeyboardArrowDownIcon  fontSize="inherit" onClick={moreButtonClick} />
                </div>
            </section>
            
		</div>
	);
}

export default withRouter(AppraisalList);
