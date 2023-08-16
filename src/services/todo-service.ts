import apiClient from "./api-client";

export interface Todo {
	id: number;
	title: string;
}

class TodoService {
	getAllTodo() {
		const controller = new AbortController();

		const request = apiClient.get<Todo[]>("/todos/");

		return { request, cancel: () => controller.abort() };
	}

	deleteTodo(id: number) {
		return apiClient.delete("/todos/" + id);
	}

	addTodo(newTodo: Todo) {
		return apiClient.post("/todos/", newTodo);
	}

	updateTodo(updatedTodo: Todo) {
		return apiClient.patch("/todos/" + updatedTodo.id, updatedTodo);
	}
}

export default new TodoService();
