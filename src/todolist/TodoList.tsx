import React from "react";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";

interface TodoItem {
	id: number;
	title: string;
	status: string;
	completed: string;
}

interface Props {
	items: TodoItem[];
	onDelete: (id: number) => void;
	onEdit: (id: number) => void;
}

const TodoList = ({ items, onDelete, onEdit }: Props) => {
	if (items.length == 0) {
		return;
	}

	return (
		<>
			<div className="p-3">
				<table className="table table-striped table-bordered">
					<thead className="thead-dark">
						<tr>
							<th>Title</th>
							<th>Status</th>
							<th>Completed</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{items.map((item) => (
							<tr key={item.id}>
								<td>{item.title}</td>
								<td>{item.status}</td>
								<td>
									{item.completed === "yes" ? (
										<AiOutlineCheck color="green" />
									) : (
										<AiOutlineClose color="red" />
									)}
								</td>
								<td>
									<button
										className="btn btn-outline-danger m-1"
										onClick={(event) => {
											event.preventDefault();
											onDelete(item.id);
										}}
									>
										Delete
									</button>
									<button
										className="btn btn-outline-primary"
										onClick={(event) => {
											event.preventDefault();
											onEdit(item.id);
										}}
									>
										Edit
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default TodoList;
