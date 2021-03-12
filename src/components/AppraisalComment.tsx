import React, { useState, useEffect } from "react";
import "../styles/AppraisalComment.css";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Pagination from "./AppraisalPagination";
import axios from "axios";

interface User {
	userId: string;
	token: string;
	authenticated: boolean;
}
interface IMypageUser extends RouteComponentProps<any> {
	user: User;
}
function AppraisalComment({ user, match }: IMypageUser) {
	const [commentState, setCommentState] = useState<any>([]);
	const [comment, setComment] = useState<string>("");
	const [commentId, setCommentId] = useState<number>();
	const [isModify, setIsModify] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [postsPerPage, setPostsPerPage] = useState<number>(5);
	const id = match.params.id;

	//* 페이지네이션
	const indexOfLast = currentPage * postsPerPage;
	const indexOfFirst = indexOfLast - postsPerPage;

	useEffect(() => {
		axios.get(`https://www.yeongn.com/api/appraisal/${id}`).then((res) => {
			setCommentState(res.data.comments);
		});
	});

	const onChangeCommnet = (e: any): void => {
		setComment(e.target.value);
	};

	const submitCommnet = (): void => {
		if (comment.length === 0) {
			return alert("댓글을 입력해주세요.");
		} else {
			axios
				.post(
					`https://www.yeongn.com/api/appraisal/${id}/comment`,
					{
						text: comment,
					},
					{
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					},
				)
				.then(() => {
					axios
						.get(`https://www.yeongn.com/api/appraisal/${id}`)
						.then((res) => {
							console.log(res.data.comments);
							setCommentState(res.data.comments);
						});
				});
		}
	};

	const commentDelets = (e: any) => {
		const CommentId = e.target.value;
		axios
			.delete(`https://www.yeongn.com/api/appraisal/comment/${CommentId}`, {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			})
			.then()
			.catch((err) => console.log(err));
	};

	const commentModifyController = (e: any) => {
		setIsModify(true);
		setCommentId(e.target.value);
	};

	const commentModify = (e: any): void => {
		if (comment.length === 0) {
			setPostsPerPage(5);
			return alert("수정할 댓글을 입력해주세요.");
		}
		axios
			.patch(
				`https://www.yeongn.com/api/appraisal/comment/${commentId}`,
				{
					text: comment,
				},
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				},
			)
			.then(() => setIsModify(false))
			.catch((err) => console.log(err));
	};

	return (
		<section className="AppraisalComment">
			<div className="AppraisalComment_divdieLine"></div>
			{commentState == null || commentState.length === 0 ? (
				<div className="AppraisalComment__noComment">
					소중한 댓글을 입력해주세요.
				</div>
			) : (
				commentState.slice(indexOfFirst, indexOfLast).map((comment: any) => (
					<div className="AppraisalComment__container" key={comment.id}>
						<div className="AppraisalComment__box">
							<div className="AppraisalComment__box__nameAndTitle">
								<div className="AppraisalComment__box__name">
									{comment.nickname}
								</div>
								<div className="AppraisalComment__box__time">
									2021년 3월 5일
								</div>
							</div>
							<div className="AppraisalComment_divdieLineNameAndTitle"></div>
							<div className="AppraisalComment__box__textAndButton">
								<div className="AppraisalComment__box__text">
									{comment.text}
								</div>
								{user.userId === comment.userId ? (
									<div className="AppraisalComment__box__buttonWrap">
										<button
											className="AppraisalComment__box__buttonWrap__submit"
											onClick={commentModifyController}
											value={comment.id}
										>
											수정
										</button>
										<button
											className="AppraisalComment__box__buttonWrap__delete"
											onClick={commentDelets}
											value={comment.id}
										>
											삭제
										</button>
									</div>
								) : null}
							</div>
						</div>
						<div className="AppraisalComment_divdieLine"></div>
					</div>
				))
			)}

			{!isModify ? null : (
				<div className="AppraisalCommentBoxModify">
					<input
						className="AppraisalCommentBox__input__Modify"
						placeholder="수정할 댓글을 적어주세요"
						onChange={onChangeCommnet}
					></input>
					<button
						className="AppraisalCommentBox__button__Modify"
						onClick={commentModify}
					>
						등록
					</button>
				</div>
			)}
			<div className="AppraisalCommentBox_divdieLine"></div>
			<Pagination
				postsPerPage={postsPerPage}
				totalPosts={commentState.length}
				paginate={setCurrentPage}
			/>
			<div className="AppraisalCommentBox">
				<input
					className="AppraisalCommentBox__input"
					placeholder="댓글을 남겨주세요"
					onChange={onChangeCommnet}
				></input>
				<button className="AppraisalCommentBox__button" onClick={submitCommnet}>
					등록
				</button>
			</div>
		</section>
	);
}

export default withRouter(AppraisalComment);
