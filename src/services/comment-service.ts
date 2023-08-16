import apiClient from "./api-client";

class CommentService {
	getAllComment() {
		const controller = new AbortController();

		const request = apiClient.get("/comments/");
		return { request, controller };
	}
}

export default new CommentService();
