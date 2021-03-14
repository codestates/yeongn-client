import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import axios from "axios";

interface MatchParams {
	word: string;
}

function SearchAppraisalList({ word }: MatchParams) {
	const [appraisalList, setAppraisalList] = useState<any>();

	useEffect(() => {
		axios.get(`/api/search/${word}`).then((res) => {
			setAppraisalList(res.data.appraisals);
		});
	}, []);

	return (
		<section className="appraisalAllList">
			<div className="appraisalAllList__title__wrap">
				<div className="appraisalAllList__title">감정소 검색 결과</div>
			</div>
			<div className="appraisalAllList__container">
				{!appraisalList || appraisalList.length === 0 ? (
					<div className="noSearchData">이런.. 찾으시는 물품이 없네요...</div>
				) : (
					appraisalList.map((appraisalList: any) => (
						<div
							className="appraisalAllList__container__card"
							key={appraisalList.id}
						>
							<Link
								to={`/appraisal/${appraisalList.id}`}
								key={appraisalList.id}
							>
								<img
									alt={"이미지"}
									src={appraisalList.imgUrl}
									className="appraisalAllList__container__img"
								></img>
								<div className="appraisalAllList__container__wrap">
									<div className="appraisalAllList_-container__nickAndLikeWrap">
										<div className="appraisalAllList__container__nick">
											{appraisalList.nickname}
										</div>
										<span className="appraisalAllList__container__like">
											<FavoriteIcon fontSize="inherit" />
										</span>
									</div>
									<div className="appraisalAllList__container__titleAndLikeCount">
										<div className="appraisalAllList__container__title">
											{appraisalList.itemName}
										</div>
										<span className="appraisalAllList__container__likeCount">
											{appraisalList.likeCount}
										</span>
									</div>
									<div className="appraisalAllList__container__price">
										<span className="appraisalAllList__container__price">
											감정가{" "}
										</span>
										{!appraisalList
											? null
											: appraisalList.average
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
										원
									</div>
								</div>
							</Link>
						</div>
					))
				)}
			</div>
		</section>
	);
}

export default SearchAppraisalList;
