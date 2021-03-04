import React, {useEffect, useState} from "react";
import { Link, withRouter } from "react-router-dom";
import Header from "../components/Header"
import "../styles/ShopLists.css"
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Category from "../components/ShopCategory"
import ArrowUp from "../components/ArrowUp";


function ShopList() {
	

	
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

    const [shopList, setShopList] = useState(initialState);
    const [categoryTitle, setCategoryTitle] = useState<string>("전체 판매");
    const [count, setCount] = useState<number>(9);


    const categoryButtonClick = (categoryTitle: string, e: any): void => {

        setCategoryTitle(categoryTitle)
        if (categoryTitle === "전체") {
            setShopList(initialState)
        } else if (categoryTitle === "높은 감정가") {
            const highPriceData = shopList.sort(function (a, b) {
                return a.price < b.price ? 1 : -1;
            });
            setShopList(highPriceData)
        } else if (categoryTitle === "낮은 감정가") {
            const highPriceData = shopList.sort(function (a, b) {
                return a.price > b.price ? 1 : -1;
            });
            setShopList(highPriceData)
        } else {
            setShopList(shopList.filter(el =>
                el.category === categoryTitle
            ))
        }
        
        const CategoryButtons = document.querySelectorAll(".ShopCategoryList__buttonBox__buttonActive")
        if (e.target.className === "ShopCategoryList__buttonBox__button") {
            e.target.className = "ShopCategoryList__buttonBox__buttonActive"
        }
        CategoryButtons.forEach(el => {
                if (el.innerHTML !== `# ${categoryTitle}` ) {
                    el.className ="ShopCategoryList__buttonBox__button"
                }
            })
}
    const moreButtonClick = ():void => {
        setCount(count => count + 6)
    }

	return (
		<div>
            <Header />
                <Category categoryButtonClick={categoryButtonClick} />
			<section className="shopAllList">
            <div className="shopAllList__title__wrap">
                <div className="shopAllList__title">
                    {`${categoryTitle} 리스트`}
                </div>
            </div>
                <div className="shopAllList__container">
                    {shopList.slice(0, count).map((shopList) => (
                    <div className="shopAllList__container__card" key={shopList.id}>
                    <Link to ={`/shop/${shopList.id}`} key={shopList.id}>
                    <div className="shopAllList__container__img">
                    </div>
                        <div className="shopAllList__container__wrap">
                            <div className="shopAllList__container__title">{shopList.name}</div>
                                <span className="shopAllList__container__price">
                                    <span className="shopAllList__container__price">감정가 </span>
                                    {shopList.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 </span>
                        </div>
                            </Link>
                </div>
                )
                )}
                </div>
                <div className="shopAllList__container__moreButton">
                    <KeyboardArrowDownIcon  fontSize="inherit" onClick={moreButtonClick} />
                </div>
            </section>
            <ArrowUp />
		</div>
	);
}

export default withRouter(ShopList);
