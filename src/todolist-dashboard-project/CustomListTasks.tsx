import React from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";

interface Task {
	project_id: number;
	id: number;
	text: string;
}

interface Props {
	tasks: Task[];
	onDelete: (id: number) => void;
	onEditId: number;
	setEditId: (id: number) => void;
	onEdit: (id: number, newText: string) => void;
	setNullId: () => void;
}

const CustomListTasks = ({
	tasks,
	onDelete,
	onEditId,
	setEditId,
	onEdit,
	setNullId,
}: Props) => {
	return (
		<ul className="list-group">
			{tasks.map((item) => (
				<li
					key={item.id}
					className="list-group-item d-flex justify-content-between"
				>
					{onEditId === item.id ? (
						<input
							value={item.text}
							onChange={(event) => {
								console.log(event.target.value);
								onEdit(item.id, event.target.value);
							}}
						/>
					) : (
						<span>{item.text}</span>
					)}
					<div className="mx-2">
						<AiOutlineDelete
							size={"20px"}
							color="red"
							onClick={() => onDelete(item.id)}
						/>
						{onEditId === item.id ? (
							<AiOutlineCheck onClick={() => setNullId()} />
						) : (
							<AiOutlineEdit
								size={"20px"}
								color="gray"
								onClick={() => setEditId(item.id)}
							/>
						)}
					</div>
				</li>
			))}
		</ul>
	);
};

export default CustomListTasks;
