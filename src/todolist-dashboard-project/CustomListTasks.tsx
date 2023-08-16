import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

interface Task {
	project_id: number;
	id: number;
	text: string;
}

interface Props {
	tasks: Task[];
	onDelete: (id: number) => void;
}

const CustomListTasks = ({ tasks, onDelete }: Props) => {
	return (
		<ul className="list-group">
			{tasks.map((item) => (
				<li
					key={item.id}
					className="list-group-item d-flex justify-content-between"
				>
					{item.text}
					<div className="mx-2">
						<AiOutlineDelete
							size={"20px"}
							color="red"
							onClick={() => onDelete(item.id)}
						/>
						<AiOutlineEdit size={"20px"} color="gray" />
					</div>
				</li>
			))}
		</ul>
	);
};

export default CustomListTasks;
