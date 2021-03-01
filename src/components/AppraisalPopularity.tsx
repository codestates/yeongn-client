import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import "../css/AppraisalPopularity.css"
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
            price: 2900,
        },
        {
            id: 4,
            name: "뜯어온 보도블럭",
            price: 4900,
        },
        {
            id: 5,
            name: "칼라 립스틱",
            price: 2900,
        },
        {
            id: 6,
            name: "잉어 슈즈",
            price: 3900,
        },
        {
            id: 7,
            name: "웰컴 매트",
            price: 6900,
        },
        {
            id: 8,
            name: "강시 모자",
            price: 9900,
        },
    ]


function AppraisalPopularity() {
 

    const [appraisalList, setAppraisalList] = useState(initialState);

    // useEffect(() => {
    //     getAppraisalData()
    // })

    // const getAppraisalData = () => {
    //     axios.get(``)
    //         .then((res) => setAppraisalList(res.data))
    //         .catch((error) => console.log(error))
    // }

    return (
        <section className="appraisal">
            <div className="appraisal__title__wrap">
                <div className="appraisal__title">
                    인기 감정가 리스트
                </div>
                <Link to={`/list/appraisal`}>
                <button className="appraisal__title__button">
                        리스트 더보기
                </button>
                </Link>
            </div>
                <div className="appraisal__popularityList">
                    {appraisalList.slice(0, 6).map((appraisalList) => (
                    <div className="appraisal__popularityList__card" key={appraisalList.id}>
                    <Link to ={`/appraisal/${appraisalList.id}`} key={appraisalList.id}>
                    <div className="appraisal__popularityList__img">
                                이미지 입네다.
                    </div>
                        <div className="appraisal__popularityList__card__wrap">
                            <div className="appraisal__popularityList__title">{appraisalList.name}</div>
                                <span className="appraisal__popularityList__price">
                                    <span className="appraisal__popularityList__price">감정가 </span>
                                    {appraisalList.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</span>
                        </div>
                        </Link>
                </div>
                )
                )}
            </div>
        </section>
    );
}

export default withRouter(AppraisalPopularity)