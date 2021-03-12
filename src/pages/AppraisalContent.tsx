import { withRouter, RouteComponentProps } from "react-router-dom";
import AppraisalContents from "../components/AppraisalContents";
import AppraisalComment from "../components/AppraisalComment";
import ScrollToTop from "../components/ScrollToTop";

interface User {
	userId: string;
	token: string;
	authenticated: boolean;
}
interface IMypageUser extends RouteComponentProps {
	user: User;
}

function AppraisalContent({ user }: IMypageUser) {
	return (
		<div>
			<ScrollToTop />
			<AppraisalContents user={user} />
			<AppraisalComment user={user} />
		</div>
	);
}

export default withRouter(AppraisalContent);
