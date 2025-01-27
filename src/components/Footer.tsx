import React from "react";
import "../styles/Footer.css";
import GitHubIcon from "@material-ui/icons/GitHub";

function Footer() {
	return (
		<div id="footer">
			<div className="footer__container">
				<div className="footer__top">
					<div className="footer__market">
						<div className="footer__market__title">연근마켓</div>
					</div>
					<div className="footer__team">
						<div className="footer__team__title">팀 소개</div>
						<div className="footer__team__description">코공해적단</div>
					</div>
					<div className="footer__captain">
						<div className="footer__captain__title">선장</div>
						<a
							href="https://github.com/lovvp"
							target="blank"
							className="footer__captain__description"
						>
							<div className="footer__github">
								<GitHubIcon fontSize="inherit" />
							</div>
							김창민
						</a>
					</div>
					<div className="footer__crew">
						<div className="footer__crew__title">선원</div>
						<a
							href="https://github.com/sleepybird96"
							target="blank"
							className="footer__crew__description"
						>
							<div className="footer__github">
								<GitHubIcon fontSize="inherit" />
							</div>
							박지상
						</a>

						<a
							href="https://github.com/SangKwon-Lee"
							target="blank"
							className="footer__crew__description"
						>
							<div className="footer__github">
								<GitHubIcon fontSize="inherit" />
							</div>
							이상권
						</a>
						<a
							href="https://github.com/chiemsee30"
							target="blank"
							className="footer__crew__description"
						>
							<div className="footer__github">
								<GitHubIcon fontSize="inherit" />
							</div>
							김제현
						</a>
					</div>
				</div>
				<div className="footer__bottom">당신만의 희귀물품 상점</div>
			</div>
		</div>
	);
}
export default Footer;
