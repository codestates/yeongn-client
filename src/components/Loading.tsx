import Loa from "../assets/img/Loading.gif";
import "../styles/Loading.css";
function Loading() {
	return (
		<div className="LoadingContainer">
			<div className="LoadingWrap">
				<img className="Loading" alt={"로딩"} src={Loa} />
				<div className="LoadingBackground">로딩중</div>
			</div>
		</div>
	);
}

export default Loading;
