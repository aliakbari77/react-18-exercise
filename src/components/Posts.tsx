import React, { useEffect, useState } from "react";
import apiClient, { CanceledError } from "../services/api-client";
import postService from "../services/post-service";
import { Post } from "../services/post-service";
import axios from "axios";

const url = "/posts/";

const Posts = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const controller = new AbortController();

		setLoading(true);

		const { request, cancel } = postService.getAllPost();

		request
			.then((res) => {
				setPosts(res.data);
				setLoading(false);
			})
			.catch((err) => {
				if (err instanceof CanceledError) return;
				setLoading(false);
				setError(err.message);
			});

		return cancel;
	}, []);

	const handleDeletePost = (post: Post) => {
		const originalPosts = posts;

		setPosts(posts.filter((item) => item.id !== post.id));
		postService.deleteUser(post.id).catch((err) => {
			setPosts(originalPosts);
			console.log(err);
		});
	};

	const handleAddPost = () => {
		const newPost: Post = {
			id: 0,
			title: "new post",
		};
		// setPosts([newPost, ...posts]);

		postService
			.addPost(newPost)
			.then(({ data: savePost }) => {
				setPosts([savePost, ...posts]);
			})
			.catch((err) => {
				if (err instanceof CanceledError) console.log(err);
				setError(err.message);
			});
	};

	const handleUpdatePost = (post: Post) => {
		const originalPosts = [...posts];

		const updatedPost = { ...post, title: post.title + "!" };

		setPosts(
			posts.map((item) => (item.id === post.id ? updatedPost : item))
		);

		postService.updatePost(updatedPost).catch((err) => {
			setPosts(originalPosts);
			setError(err.message);
		});
	};

	return (
		<>
			{isLoading && <p>Loading...</p>}
			{error && <p className="text-danger">{error}</p>}
			<button className="btn btn-primary mb-3" onClick={handleAddPost}>
				Add
			</button>
			<ul className="list-group">
				{posts.map((post) => (
					<li
						className="list-group-item d-flex justify-content-between"
						key={post.id}
					>
						{post.title}
						<div>
							<button
								className="btn btn-outline-secondary mx-1"
								onClick={() => handleUpdatePost(post)}
							>
								Update
							</button>
							<button
								className="btn btn-outline-danger"
								onClick={() => handleDeletePost(post)}
							>
								Delete
							</button>
						</div>
					</li>
				))}
			</ul>
		</>
	);
};

export default Posts;
