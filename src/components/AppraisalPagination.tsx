import "../styles/AppraisalPagination.css";

type PaginationProps = {
	postsPerPage: number;
	totalPosts: number;
	paginate: (number: number) => void;
};

function AppraisalPagination({
	postsPerPage,
	totalPosts,
	paginate,
}: PaginationProps) {
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pageNumbers.push(i);
	}
	return (
		<div className="Appraisalpagination">
			<ul className="Appraisalpagination__ul">
				{pageNumbers.map((number) => (
					<li key={number} className="Appraisalpagination__li">
						<button
							onClick={() => paginate(number)}
							className="Appraisalpagination__link"
						>
							{number}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default AppraisalPagination;
