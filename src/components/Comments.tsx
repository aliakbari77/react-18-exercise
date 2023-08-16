import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentCard from "./CommentCard";
import Modal from "./Modal";

const url = "https://jsonplaceholder.typicode.com/comments/";

interface Comment {
	postId: number;
	id: number;
	name: string;
	email: string;
	body: string;
}

const Comments = () => {
	const [comments, setComments] = useState<Comment[]>([]);
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [modal, setModal] = useState(false);
	const [selectedComment, setSelectedComment] = useState<{
		id: number;
		name: string;
		body: string;
	}>();

	useEffect(() => {
		setLoading(true);
		axios
			.get(url)
			.then((res) => {
				setComments(res.data);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	const handleEditComment = (id: number, name: string, body: string) => {
		setSelectedComment({ id, name, body });
		setModal(true);
		console.log(id, name, body, "Edited");
	};

	const handleDeleteComment = (id: number, name: string, body: string) => {
		setSelectedComment({ id, name, body });
		// setModal(true);
		const originalComments = comments;
		setComments(comments.filter((comment) => comment.id !== id));
		axios.delete(url + id).catch(() => {
			setComments(originalComments);
		});
		console.log(id, name, body, "Deleted");
	};

	const hadleModal = () => {
		setModal(false);
	};

	return (
		<>
			<div className="p-3">
				{selectedComment && modal && (
					<Modal
						title={selectedComment?.name}
						body={selectedComment.body}
						state="submit"
						onClose={hadleModal}
					/>
				)}
				{error && <p className="text-danger">{error}</p>}
				{isLoading && <div className="spinner-border"></div>}
				{comments.length > 0 &&
					comments.map((comment) => (
						<CommentCard
							key={comment.id}
							postId={comment.postId}
							id={comment.id}
							name={comment.name}
							email={comment.email}
							body={comment.body}
							onEdit={handleEditComment}
							onDelete={handleDeleteComment}
						/>
					))}
			</div>
		</>
	);
};

export default Comments;
