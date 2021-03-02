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
							<GitHubIcon />
							김창민
						</a>
					</div>
					<div className="footer__crew">
						<div className="footer__crew__title">선원</div>
						<p>
							<a
								href="https://github.com/sleepybird96"
								target="blank"
								className="footer__crew__description"
							>
								<GitHubIcon />
								박지상
							</a>
						</p>
						<a
							href="https://github.com/SangKwon-Lee"
							target="blank"
							className="footer__crew__description"
						>
							<GitHubIcon />
							이상권
						</a>
						<a
							href="https://github.com/chiemsee30"
							target="blank"
							className="footer__crew__description"
						>
							<GitHubIcon />
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
