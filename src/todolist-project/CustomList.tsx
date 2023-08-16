import React from "react";
import Todo from "./Todo.interface";
import { MdDone } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { BiTransfer } from "react-icons/bi";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

interface Props {
	items: Todo[];
	onToggle: (id: number) => void;
	onEdit: (id: number) => void;
	onDelete: (id: number) => void;
	onClearList: () => void;
}

const CustomList = ({
	items,
	onToggle,
	onEdit,
	onDelete,
	onClearList,
}: Props) => {
	return (
		<>
			<ul className="list-group">
				{items.map((item) => (
					<li
						className="list-group-item d-flex justify-content-between"
						key={item.id}
					>
						{item.title}
						<div>
							<button
								className="btn"
								onClick={() => onEdit(item.id)}
							>
								<AiFillEdit size={"24px"} />
							</button>
							<button
								className="btn"
								onClick={() => onToggle(item.id)}
							>
								<BiTransfer color="blue" size={"24px"} />
							</button>
							{item.completed ? (
								<MdDone color="green" size={"24px"} />
							) : (
								<AiOutlineClose color="red" size={"24px"} />
							)}
							<span> | </span>
							<button
								className="btn"
								onClick={() => onDelete(item.id)}
							>
								<AiFillDelete color="red" size={"24px"} />
							</button>
						</div>
					</li>
				))}
			</ul>
			<button className="btn btn-danger mt-2" onClick={onClearList}>Clear list</button>
		</>
	);
};

export default CustomList;
