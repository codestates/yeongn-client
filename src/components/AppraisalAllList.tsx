import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import "../styles/AppraisalAllList.css"

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

type CategoryNameProps = RouteComponentProps &  {
    CategoryName: string;
}

function AppraisalAllList({ CategoryName = "높은 감정가" }: CategoryNameProps) {

    const [appraisalList, setAppraisalList] = useState(initialState);
    const [categoryTitle, setCategoryTitle] = useState<string>("높은 감정가")

    useEffect(() => {
        setCategoryTitle(CategoryName)

    })

    const categoryFilter = (CategoryName: string) => {

        const a = appraisalList.filter(el => 
            el.category === CategoryName
        )
        setAppraisalList(a)
        console.log(a)
    }

    return (
        <section className="appraisalAllList">
            <div className="appraisalAllList__title__wrap">
                <div className="appraisalAllList__title">
                    {`${categoryTitle} 리스트`}
                </div>
            </div>
                <div className="appraisalAllList__container">
                    {appraisalList.slice(0, 9).map((appraisalList) => (
                    <div className="appraisalAllList__container__card" key={appraisalList.id}>
                    <Link to ={`/appraisal/${appraisalList.id}`} key={appraisalList.id}>
                    <div className="appraisalAllList__container__img">
                                이미지
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
        </section>
    );
}

export default withRouter(AppraisalAllList)