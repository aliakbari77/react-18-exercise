import React from "react";

interface Props {
	onChangeFilter: (status: string) => void;
}

const CustomSelect = ({ onChangeFilter }: Props) => {
	return (
		<select
			className="form-select mb-3"
			onChange={(event) => onChangeFilter(event.target.value)}
		>
			<option value="">All Todo Items</option>
			<option value="completed">Completed</option>
			<option value="not-completed">Not Completed</option>
		</select>
	);
};

export default CustomSelect;
