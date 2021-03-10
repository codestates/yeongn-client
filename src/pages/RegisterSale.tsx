import React, { useState, useEffect, useRef } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import "../styles/RegisterSale.css";
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

function RegisterSale({ user, history }: IMypageUser) {
	//userId가 넘어와야함
	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		const { current } = inputRef;
		if (current !== null) {
			current.focus();
		}
	}, []);
	const CategoryButton: Array<string> = [
		"줘도 안 가지는",
		"도저히 분류하기 힘든",
		"음식",
		"의류",
		"가구",
		"악기",
		"알코올",
		"게임",
		"피규어",
		"화장품",
		"악세사리",
		"인테리어",
		"전자기기",
		"핸드 메이드",
	];
	// const id = userId
	const id = 3;
	const [file, setFile] = useState<fileForm>({
		selectedFile: "",
		previewURL: null,
	});
	const [info, setInfo] = useState({
		title: "",
		text: "",
		price: 0,
		contact: "",
	});

	const [category, setCategory] = useState("");

	const handleCategoryClick = (e: any) => {
		e.preventDefault();
		setCategory(e.target.value);
		const CategoryButtons = document.querySelectorAll(
			".registerCategoryList__buttonBox__buttonActive",
		);
		if (e.target.className === "registerCategoryList__buttonBox__button") {
			e.target.className = "registerCategoryList__buttonBox__buttonActive";
		}
		CategoryButtons.forEach((el) => {
			if (el.innerHTML !== `# ${category}`) {
				el.className = "registerCategoryList__buttonBox__button";
			}
		});
	};

	const validateForm = () => {
		if (info.title === "") {
			alert("title을 입력하세요");
		} else if (category === "") {
			alert("카테고리를 선택하세요");
		} else if (info.price === 0) {
			alert("카테고리를 선택하세요");
		} else if (info.text === "") {
			alert("상품 설명을 입력하세요");
		} else if (info.contact === "") {
			alert("연락받으실 정보를 입력하세요");
		} else if (file.selectedFile === "") {
			alert("이미지를 등록하세요");
		}
	};

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const url = "url";
		validateForm();
		const formData = new FormData();
		formData.append("image", file.selectedFile);
		formData.append("title", info.title);
		formData.append("category", category);
		formData.append("price", info.price.toString());
		formData.append("text", info.text);
		formData.append("contact", info.contact);

		const uploadUrl = "https://www.yeongn.com/api/shop";
		const config = {
			headers: {
				"content-type": "multipart/form-data",
				Authorization: `Bearer ${user.token}`,
			},
		};

		axios
			.post(uploadUrl, formData, config)
			.then((res) => {
				history.push("/shop");
			})
			.catch(() => {
				alert("서버오류입니다.");
			});
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
	return (
		<div id="register__store__section">
			<form className="register__store__container" onSubmit={handleFormSubmit}>
				<h2 className="register__store__title">상품 등록</h2>
				<div className="register__category__container">
					<div className="category__title">카테고리</div>
					<div className="category__button__container">
						{CategoryButton.map((item, index) => {
							return (
								<button
									key={index}
									className="registerCategoryList__buttonBox__button"
									onClick={handleCategoryClick}
									value={item}
								>
									{item}
								</button>
							);
						})}
					</div>
				</div>
				<div className="register__title__container">
					<div className="register__title">제목</div>
					<input
						type="text"
						name="title"
						onChange={onChange}
						className="register__title__content"
						placeholder="15자 이내로 입력하세요"
						maxLength={15}
						ref={inputRef}
					/>
				</div>

				<div className="register__price__container">
					<div className="price__title">희망 가격</div>
					<input
						type="number"
						name="price"
						onChange={onChange}
						className="register__price__content"
						placeholder="숫자로만 입력하세요"
					/>
				</div>
				<div className="register__description__container">
					<div className="description__title">상품 설명</div>
					<div className="description__container">
						<textarea
							name="text"
							onChange={onChange}
							className="description__content"
							placeholder="100자 이내로 제품을 설명해주세요"
							maxLength={100}
							wrap="virtual"
						/>
					</div>
				</div>
				<div className="register__contact__container">
					<div className="contact__title">연락처</div>
					<input
						type="textarea"
						name="contact"
						onChange={onChange}
						className="register__contact__content"
						maxLength={50}
						placeholder="연락처를 50자 이내로 공유해주세요"
					/>
					<div className="description__info">
						👀 해당 연락처는 구매희망을 원하는 회원에게만 보여집니다 👀
					</div>
				</div>
				<div className="register__img__container">
					<div className="img__title">이미지 등록</div>
					<label className="input-file-button" htmlFor="input-file">
						<div className="input__file__button">
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
						<div className="img__container">
							<img
								className="register__img"
								src={file.previewURL}
								style={{
									width: "150px",
									height: "150px",
								}}
							/>
							<button className="img__delete__btn" onClick={handleImgDelete}>
								삭제
							</button>
						</div>
					) : (
						<div className="register__img__box">
							대표 이미지 1개를 등록해주세요.
						</div>
					)}
				</div>

				<button type="submit" className="register__form__btn">
					등록
				</button>
			</form>
			{/* <Footer /> */}
			<ArrowUp />
		</div>
	);
}

export default withRouter(RegisterSale);
