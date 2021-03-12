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
	setContentId: (e: any) => void;
	setUserId: (e: any) => void;
	setModify: (e: boolean) => void;
}

function AppraisalContent({
	user,
	setContentId,
	setUserId,
	setModify,
}: IMypageUser) {
	return (
		<div>
			<ScrollToTop />
			<AppraisalContents
				user={user}
				setContentId={setContentId}
				setUserId={setUserId}
				setModify={setModify}
			/>
			<AppraisalComment user={user} />
		</div>
	);
}

export default withRouter(AppraisalContent);
