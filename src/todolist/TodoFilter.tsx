import React from "react";

interface Props {
	onSelectFilter: (filter: string) => void;
}

const TodoFilter = ({ onSelectFilter }: Props) => {
	return (
		<>
			<select className="form-select" onChange={(e) => onSelectFilter(e.target.value)}>
				<option value="">Select Status</option>
				<option value="In Progress">In Progress</option>
				<option value="Testing">Testing</option>
				<option value="ToDo">ToDo</option>
			</select>
		</>
	);
};

export default TodoFilter;
