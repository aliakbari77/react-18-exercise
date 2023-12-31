import React from "react";

interface Props {
	onSearch: (searchValue: string) => void;
}

const CustomSearchInput = ({ onSearch }: Props) => {
	return (
		<>
			<input
				className="form-control mb-3"
				placeholder="Search task . . ."
				onChange={(event) => {
					onSearch(event.target.value);
				}}
			/>
		</>
	);
};

export default CustomSearchInput;
