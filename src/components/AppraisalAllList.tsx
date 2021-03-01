import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import "../css/AppraisalAllList.css"

const initialState = 
    [
        {
            id: 1,
            name: "노른자 분리기",
            price: 9900,
        },
        {
            id: 2,
            name: "2020년 달력",
            price: 12000,
        },
        {
            id: 3,
            name: "개구리 안대",
            price: 290000,
        },
        {
            id: 4,
            name: "뜯어온 보도블럭",
            price: 4900000,
        },
        {
            id: 5,
            name: "칼라 립스틱",
            price: 29000000,
        },
        {
            id: 6,
            name: "잉어 슈즈",
            price: 39000000,
        },
        {
            id: 7,
            name: "웰컴 매트",
            price: 690000000,
        },
        {
            id: 8,
            name: "강시 모자",
            price: 9900,
        },
    ]

type CategoryNameProps = RouteComponentProps &  {
    CategoryName: string;
}

function AppraisalAllList({ CategoryName }: CategoryNameProps) {

    const [appraisalList, setAppraisalList] = useState(initialState);
    const [categoryTitle, setCategoryTitle] = useState<string>("높은 감정가")

    return (
        <section className="appraisalAllList">
            <div className="appraisalAllList__title__wrap">
                <div className="appraisalAllList__title">
                    {`${categoryTitle} 리스트`}
                </div>
            </div>
            <div>{CategoryName}aaaaaaaa</div>
                <div className="appraisalAllList__container">
                    {appraisalList.slice(0, 9).map((appraisalList) => (
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
        </section>
    );
}

export default withRouter(AppraisalAllList)