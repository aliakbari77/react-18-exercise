import React from "react";

interface Prop {
	postId: number;
	id: number;
	name: string;
	email: string;
	body: string;
	onEdit: (id: number, name: string, body: string) => void;
	onDelete: (id: number, name: string, body: string) => void;
}

const CommentCard = ({
	postId,
	id,
	name,
	email,
	body,
	onEdit,
	onDelete,
}: Prop) => {
	return (
		<>
			<div className="card mb-3">
				<div className="card-body">
					<h5 className="card-title">{name}</h5>
					<h6 className="card-subtitle mb-2 text-muted">{email}</h6>
					<p className="card-text">{body}</p>
					<button
						className="btn btn-outline-primary m-1"
						onClick={() => {
							onEdit(id, name, body);
						}}
					>
						Edit
					</button>
					<button
						className="btn btn-outline-danger"
						onClick={() => {
							onDelete(id, name, body);
						}}
					>
						Delete
					</button>
				</div>
			</div>
		</>
	);
};

export default CommentCard;
