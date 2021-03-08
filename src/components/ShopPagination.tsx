import "../styles/ShopPagination.css";

type PaginationProps = {
	postsPerPage: number;
	totalPosts: number;
	paginate: (number: number) => void;
};

function ShopPagination({
	postsPerPage,
	totalPosts,
	paginate,
}: PaginationProps) {
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pageNumbers.push(i);
	}
	return (
		<div className="Shoppagination">
			<ul className="Shoppagination__ul">
				{pageNumbers.map((number) => (
					<li key={number} className="Shoppagination__li">
						<button
							onClick={() => paginate(number)}
							className="Shoppagination__link"
						>
							{number}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default ShopPagination;
