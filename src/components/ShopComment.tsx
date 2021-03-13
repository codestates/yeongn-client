import React, { useState, useEffect, useRef } from "react";
import "../styles/ShopComment.css";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Pagination from "./ShopPagination";
import axios from "axios";

interface User {
	userId: string;
	token: string;
	authenticated: boolean;
}
interface IMypageUser extends RouteComponentProps<any> {
	user: User;
}

function ShopComment({ user, match }: IMypageUser) {
	const [commentState, setCommentState] = useState<any>([]);
	const [comment, setComment] = useState<string>("");
	const [commentId, setCommentId] = useState<number>();
	const [isModify, setIsModify] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [postsPerPage, setPostsPerPage] = useState<number>(5);
	const indexOfLast = currentPage * postsPerPage;
	const indexOfFirst = indexOfLast - postsPerPage;
	const id = match.params.id;
	const inputRef = useRef<HTMLInputElement>(null);
	const ModifyInputRef = useRef<HTMLInputElement>(null);
	const handleKeyPress = (e: any) => {
		if (e.key === "Enter") {
			submitCommnet();
		}
	};

	const handleModifyKeyPress = (e: any) => {
		if (e.key === "Enter") {
			commentModify();
		}
	};

	const renderComment = (): void => {
		axios.get(`/api/shop/${id}`).then((res) => {
			setCommentState(res.data.comments.reverse());
		});
	};

	useEffect(() => {
		renderComment();
	}, []);

	const onChangeCommnet = (e: any): void => {
		setComment(e.target.value);
	};
	const submitCommnet = (): void => {
		if (!user.token) {
			alert("로그인 후 이용해주세요.");
		}
		if (comment.length === 0) {
			return alert("댓글을 입력해주세요.");
		} else {
			axios
				.post(
					`/api/shop/${id}/comment`,
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
					if (inputRef.current !== null) {
						inputRef.current.value = "";
					}
					renderComment();
				});
		}
	};

	const commentDelets = (e: any) => {
		const CommentId = e.target.value;
		axios
			.delete(`/api/shop/comment/${CommentId}`, {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			})
			.then(() => renderComment())
			.catch((err) => alert(err));
	};
	const commentModifyController = (e: any) => {
		setIsModify(true);
		setCommentId(e.target.value);
	};

	const commentModify = () => {
		if (!user.token) {
			alert("로그인 후 이용해주세요.");
		}
		if (comment.length === 0) {
			setPostsPerPage(5);
			return alert("수정할 댓글을 입력해주세요.");
		}
		axios
			.patch(
				`/api/shop/comment/${commentId}`,
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
				renderComment();
				setIsModify(false);
				if (ModifyInputRef.current !== null) {
					ModifyInputRef.current.value = "";
				}
			})
			.catch((err) => alert(err));
	};
	return (
		<section className="ShopComment">
			<div className="ShopComment_divdieLine"></div>

			{commentState == null || commentState.length === 0 ? (
				<div className="AppraisalComment__noComment">
					소중한 댓글을 입력해주세요.
				</div>
			) : (
				commentState.slice(indexOfFirst, indexOfLast).map((comment: any) => (
					<div className="ShopComment__container" key={comment.id}>
						<div className="ShopComment__box">
							<div className="ShopComment__box__nameAndTitle">
								<div className="ShopComment__box__name">{comment.nickname}</div>
								<div className="ShopComment__box__time">
									{comment.createdAt.slice(0, 10)}
								</div>
							</div>
							<div className="ShopComment_divdieLineNameAndTitle"></div>
							<div className="ShopComment__box__textAndButton">
								<div className="ShopComment__box__text">{comment.text}</div>
								{+user.userId === comment.userId ? (
									<div className="ShopComment__box__buttonWrap">
										<button
											className="ShopComment__box__buttonWrap__submit"
											onClick={commentModifyController}
											value={comment.id}
										>
											수정
										</button>
										<button
											className="ShopComment__box__buttonWrap__delete"
											onClick={commentDelets}
											value={comment.id}
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
						onKeyPress={handleModifyKeyPress}
						ref={ModifyInputRef}
					></input>
					<button
						className="ShopCommentBox__button__Modify"
						onClick={commentModify}
					>
						등록
					</button>
				</div>
			)}
			<div className="ShopCommentBox_divdieLine"></div>
			<Pagination
				postsPerPage={postsPerPage}
				totalPosts={commentState.length}
				paginate={setCurrentPage}
			/>
			<div className="ShopCommentBox">
				<input
					className="ShopCommentBox__input"
					placeholder="댓글을 남겨주세요"
					onChange={onChangeCommnet}
					onKeyPress={handleKeyPress}
					ref={inputRef}
				></input>
				<button className="ShopCommentBox__button" onClick={submitCommnet}>
					등록
				</button>
			</div>
		</section>
	);
}

export default withRouter(ShopComment);
