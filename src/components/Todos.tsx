import React, { useEffect, useState } from "react";
import todoService, { Todo } from "../services/todo-service";
import { CanceledError } from "../services/api-client";

const Todos = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [error, setError] = useState("");

	useEffect(() => {
		const { request, cancel } = todoService.getAllTodo();

		request
			.then(({ data: todoItems }) => setTodos(todoItems))
			.catch(({ message }) => setError(message));

		return () => {
			cancel();
		};
	}, []);

	const handleDelete = (id: number) => {
		const originalTodos = [...todos];
		setTodos(todos.filter((todo) => todo.id !== id));

		todoService.deleteTodo(id).catch((err) => {
			if (err instanceof CanceledError) return;
			setError(err.message);
			setTodos(originalTodos);
		});
	};

	const handleAdd = () => {
		const originalTodos = [...todos];
		const newTodo = { id: 0, title: "new todo" };
		// setTodos([...todos, newTodo]);

		todoService
			.addTodo(newTodo)
			.then(({ data: saveTodo }) => {
				setTodos([saveTodo, ...todos]);
				console.log(saveTodo);
			})
			.catch((err) => {
				if (err instanceof CanceledError) return;
				setError(err.message);
				setTodos(originalTodos);
			});
	};

	const handleUpdate = (todo: Todo) => {
		const originalTodos = [...todos];

		const updatedTodo = { ...todo, title: "edited" };
		setTodos(
			todos.map((item) => (item.id === todo.id ? updatedTodo : item))
		);

		todoService.updateTodo(updatedTodo).catch((err) => {
			if (err instanceof CanceledError) return;
			setError(err.message);
			setTodos(originalTodos);
		});
	};

	return (
		<>
			<div className="p-3">
				{error && <p className="alert alert-danger">{error}</p>}
				<button className="btn btn-primary my-2" onClick={handleAdd}>
					Add
				</button>
				<ul className="list-group">
					{todos.map((todo) => (
						<li
							className="list-group-item d-flex justify-content-between"
							key={todo.id}
						>
							{todo.title}
							<div>
								<button className="btn btn-outline-secondary mx-2" onClick={() => handleUpdate(todo)}>
									Update
								</button>
								<button
									className="btn btn-outline-danger"
									onClick={() => handleDelete(todo.id)}
								>
									Delete
								</button>
							</div>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default Todos;
