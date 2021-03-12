import React, { useState, useEffect, useRef } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import "../styles/RegisterAppraisal.css";
import ArrowUp from "../components/ArrowUp";

interface fileForm {
	selectedFile: any;
	previewURL: any;
}

interface User {
	userId: string;
	token: string;
	authenticated: boolean;
}

interface IMypageUser extends RouteComponentProps {
	user: User;
}

function RegisterAppraisal({ user, history }: IMypageUser) {
	const inputRef = useRef<HTMLInputElement>(null);
	const numberRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const { current } = inputRef;
		if (current !== null) {
			current.focus();
		}
	}, []);

	const CategoryButton: Array<string> = [
		"높은 가격",
		"낮은 가격",
		"인기 많은",
		"줘도 안 가지는",
		"도저히 분류하기 힘든",
		"꽃",
		"책",
		"음식",
		"의류",
		"가구",
		"악기",
		"게임",
		"알코올",
		"장난감",
		"피규어",
		"화장품",
		"악세사리",
		"인테리어",
		"전자기기",
		"핸드 메이드",
	];

	// const id = userId
	const [file, setFile] = useState<fileForm>({
		selectedFile: "",
		previewURL: null,
	});
	const [info, setInfo] = useState({
		title: "",
		text: "",
		price: 0,
	});

	const [category, setCategory] = useState("");

	const handleCategoryClick = (e: any) => {
		e.preventDefault();
		setCategory(e.target.value);
		const CategoryButtons = document.querySelectorAll(
			".registerAppraisal__buttonBox__buttonActive",
		);
		if (e.target.className === "registerAppraisal__buttonBox__button") {
			e.target.className = "registerAppraisal__buttonBox__buttonActive";
		}
		CategoryButtons.forEach((el) => {
			if (el.innerHTML !== `# ${category}`) {
				el.className = "registerAppraisal__buttonBox__button";
			}
		});
	};

	const validateForm = () => {
		if (info.title === "") {
			alert("title을 입력하세요");
		} else if (category === "") {
			alert("카테고리를 선택하세요");
		} else if (info.price === 0 || info.price < 0) {
			alert("금액은 입력되어야하고 0보다 커야합니다.");
		} else if (info.text === "") {
			alert("상품 설명을 입력하세요");
		} else if (file.selectedFile === "") {
			alert("이미지를 등록하세요");
		} else {
			const formData = new FormData();
			formData.append("image", file.selectedFile);
			formData.append("title", info.title);
			formData.append("category", category);
			formData.append("price", info.price.toString());
			formData.append("text", info.text);

			const uploadUrl = "https://www.yeongn.com/api/appraisal";
			const config = {
				headers: {
					"content-type": "multipart/form-data",
					Authorization: `Bearer ${user.token}`,
				},
			};

			axios
				.post(uploadUrl, formData, config)
				.then((res) => {
					history.push("/appraisal");
				})
				.catch((err) => {
					console.log(err);
					alert("서버오류입니다.");
				});
		}
	};

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const url = "url";
		validateForm();
	};
	const handleImgDelete = () => {
		setFile({ selectedFile: "", previewURL: null });
	};
	const handleFileChange = (e: any) => {
		e.preventDefault();
		const reader = new FileReader();
		let newFile = e.target.files[0];
		reader.onloadend = () => {
			setFile({
				selectedFile: newFile,
				previewURL: reader.result,
			});
		};
		reader.readAsDataURL(newFile);
	};
	const onChange = (e: any) => {
		const { value, name } = e.target;
		setInfo({
			...info,
			[name]: value,
		});
	};
	const onWheel = () => {
		if (numberRef.current !== null) {
			numberRef.current.blur();
		}
	};

	return (
		<div id="register__appraisal__section">
			<form
				className="register__appraisal__container"
				onSubmit={handleFormSubmit}
			>
				<h2 className="register__appraisal__title">감정 등록</h2>
				<div className="register__appraisal__category__container">
					<div className="appraisal__category__title">카테고리</div>
					<div className="appraisal__category__button__container">
						{CategoryButton.map((item, index) => {
							return (
								<button
									key={index}
									className="registerAppraisal__buttonBox__button"
									onClick={handleCategoryClick}
									value={item}
								>
									{item}
								</button>
							);
						})}
					</div>
				</div>
				<div className="appraisal__register__title__container">
					<div className="appraisal__register__title">제목</div>
					<input
						type="text"
						name="title"
						onChange={onChange}
						className="appraisal__register__title__content"
						placeholder="15자 이내로 입력하세요"
						maxLength={15}
						ref={inputRef}
					/>
				</div>

				<div className="register__appraisal__price__container">
					<div className="appraisal__price__title">예상감정가</div>
					<input
						type="number"
						name="price"
						onChange={onChange}
						className="appraisal__register__price__content"
						placeholder="숫자로만 입력하세요"
						ref={numberRef}
						onWheel={onWheel}
					/>
				</div>
				<div className="register__appraisal__description__container">
					<div className="appraisal__description__title">상품 설명</div>
					<div className="appraisal__description__container">
						<textarea
							name="text"
							onChange={onChange}
							className="appraisal__description__content"
							placeholder="100자 이내로 제품을 설명해주세요"
							maxLength={100}
							wrap="virtual"
						/>
					</div>
				</div>
				<div className="register__appraisal__img__container">
					<div className="appraisal__img__title">이미지 등록</div>
					<label className="appraisal__input-file-button" htmlFor="input-file">
						<div className="appraisal__input__file__button">
							<AddIcon fontSize="inherit" />
						</div>
					</label>
					<input
						type="file"
						id="input-file"
						onChange={handleFileChange}
						accept=".jpeg, .png "
						style={{ display: "none" }}
					/>
					{file.previewURL ? (
						<div className="appraisal__img__container">
							<img
								className="register__appraisal__img"
								src={file.previewURL}
								style={{
									width: "150px",
									height: "150px",
								}}
							/>
							<button
								className="appraisal__img__delete__btn"
								onClick={handleImgDelete}
							>
								삭제
							</button>
						</div>
					) : (
						<div className="appraisal__register__img__box">
							대표 이미지 1개를 등록해주세요.
						</div>
					)}
				</div>

				<button type="submit" className="appraisal__register__form__btn">
					등록
				</button>
			</form>
			{/* 
				<Footer />
			 */}
			<ArrowUp />
		</div>
	);
}

export default withRouter(RegisterAppraisal);
