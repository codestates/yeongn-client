import React, { useState, useEffect } from "react";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import "../styles/ArrowUp.css";
function ArrowUp() {
	const [scrollY, setScrollY] = useState<number>(window.scrollY);
	const [showArrow, setShowArrow] = useState<boolean>(false);
	const root = document.querySelector("#root") as HTMLElement;
	const handleScroll = (): void => setScrollY(window.scrollY);
	const showArrowUp = (): void => {
		if (scrollY > 400) {
			setShowArrow(true);
		} else {
			setShowArrow(false);
		}
	};
	const goUp = (): void => {
		root.scrollIntoView({ behavior: "smooth" });
	};
	useEffect(() => {
		window.addEventListener("scroll", () => {
			handleScroll();
			showArrowUp();
		});
	});
	return (
		<div className={showArrow ? "arrow-up visible" : "arrow-up"} onClick={goUp}>
			<ArrowUpwardIcon fontSize="inherit" />
		</div>
	);
}

export default ArrowUp;
