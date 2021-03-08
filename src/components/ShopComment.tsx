import React, { useState, useEffect } from "react";
import "../styles/ShopComment.css";
import Pagination from "./ShopPagination";
const initialState = [
	{
		id: 1,
		nick: "잠자는 나비",
		text: "어맛 넘모 귀엽다",
	},
	{
		id: 2,
		nick: "나비 짱짱맨",
		text: "나비야 잘 살고 있니",
	},
	{
		id: 3,
		nick: "이것이 나비",
		text: "나비 요즘 머하냐 가족 생겼던데",
	},
	{
		id: 4,
		nick: "헛소리충",
		text: "어제 T1경기 본 사람?",
	},
];

function ShopComment() {
	const [state, setState] = useState(initialState);
	const [comment, setComment] = useState<string>("");
	const [userInfo, setUserInfo] = useState<string>("코공");
	const [isUser, setIsUser] = useState<boolean>(false);
	const [test, setTest] = useState<string>("");
	const [isModify, setIsModify] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [postsPerPage, setPostsPerPage] = useState<number>(5);

	const indexOfLast = currentPage * postsPerPage;
	const indexOfFirst = indexOfLast - postsPerPage;

	useEffect(() => {
		submitCommnet();
	});
	const onChangeCommnet = (e: any): void => {
		setComment(e.target.value);
	};

	const submitCommnet = (): void => {
		if (comment.length === 0) {
			return;
		}
		initialState.push({
			id: 5,
			nick: "코공",
			text: comment,
		});
	};

	const isUserController = () => {
		initialState.map((content) => {
			if (content.nick === userInfo) {
				setIsUser(true);
			} else {
				setIsUser(false);
			}
		});
	};

	const commentDelets = (e: any) => {
		setTest(e.target.value);
		console.log(initialState);
		setState(initialState.filter((comment) => comment.nick !== test));
		console.log(initialState);
	};
	const commentModifyController = (e: any) => {
		setIsModify(true);
	};

	const commentModify = (): void => {
		if (comment.length === 0) {
			return;
		}
	};

	return (
		<section className="ShopComment">
			<div className="ShopComment_divdieLine"></div>

			{state == null || state.length === 0 ? (
				<div className="ShopComment__noComment">
					소중한 댓글을 입력해주세요.
				</div>
			) : (
				state.slice(indexOfFirst, indexOfLast).map((comment) => (
					<div className="ShopComment__container" key={comment.id}>
						<div className="ShopComment__box">
							<div className="ShopComment__box__nameAndTitle">
								<div className="ShopComment__box__name">{comment.nick}</div>
								<div className="ShopComment__box__time">2021년 3월 5일</div>
							</div>
							<div className="ShopComment_divdieLineNameAndTitle"></div>
							<div className="ShopComment__box__textAndButton">
								<div className="ShopComment__box__text">{comment.text}</div>
								{userInfo === comment.nick ? (
									<div className="ShopComment__box__buttonWrap">
										<button
											className="ShopComment__box__buttonWrap__submit"
											key={comment.nick}
											onClick={commentModifyController}
										>
											수정
										</button>
										<button
											className="ShopComment__box__buttonWrap__delete"
											onClick={commentDelets}
											value={comment.nick}
										>
											삭제
										</button>
									</div>
								) : null}
							</div>
						</div>
						<div className="ShopComment_divdieLine"></div>
					</div>
				))
			)}
			{!isModify ? null : (
				<div className="ShopCommentBoxModify">
					<input
						className="ShopCommentBox__input__Modify"
						placeholder="수정할 댓글을 적어주세요"
						onChange={onChangeCommnet}
					></input>
					<button
						className="ShopCommentBox__button__Modify"
						onClick={submitCommnet}
					>
						등록
					</button>
				</div>
			)}
			<div className="ShopCommentBox_divdieLine"></div>
			<Pagination
				postsPerPage={postsPerPage}
				totalPosts={state.length}
				paginate={setCurrentPage}
			/>
			<div className="ShopCommentBox">
				<input
					className="ShopCommentBox__input"
					placeholder="댓글을 남겨주세요"
					onChange={onChangeCommnet}
				></input>
				<button className="ShopCommentBox__button" onClick={commentModify}>
					등록
				</button>
			</div>
		</section>
	);
}

export default ShopComment;
