import apiClient from "./api-client";

export interface Post {
	id: number;
	title: string;
}

class PostService {
	getAllPost() {
		const controller = new AbortController();

		const request = apiClient.get<Post[]>("/posts/", {
			signal: controller.signal,
		});

		return { request, cancel: () => controller.abort() };
	}

	deleteUser(id: number) {
		return apiClient.delete("/posts/" + id);
	}

	addPost(newPost: Post) {
		return apiClient.post("/posts/", newPost);
	}

	updatePost(updatedPost: Post) {
		return apiClient.patch("/posts/" + updatedPost.id, updatedPost);
	}
}

export default new PostService();
