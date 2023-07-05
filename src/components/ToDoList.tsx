import React, { useState, FormEvent, ChangeEvent } from "react";

interface ToDo {
	id: number;
	text: string;
}

const ToDoList = () => {
	const [item, setItem] = useState("");
	const [todos, setToDos] = useState<ToDo[]>([]);

	const chageInput = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setItem(value);
	};

	const addToDo = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (item.trim() === "") {
			return;
		}

		const newItem: ToDo = {
			id: Date.now(),
			text: item?.trim(),
		};

		setItem("");
		setToDos([...todos, newItem]);
	};

	const removeFromToDo = (id: number) => {
		const filteredTodo = todos.filter((item, index) => item.id !== id);
		setToDos(filteredTodo);
	};

	const updateToDo = (id: number) => {
		const updatedTodo = todos.map((item, index) => {
			if (item.id == id) {
				return { ...item, text: "edited" };
			}
			return item;
		});

		setToDos(updatedTodo);
	};

	return (
		<>
			<form onSubmit={addToDo}>
				<div className="row">
					<div className="col">
						<input
							type="text"
							value={item}
							name="text"
							className="form-control"
							placeholder="Title"
							onChange={chageInput}
						/>
					</div>
					<div className="col">
						<button type="submit" className="btn btn-primary">
							+
						</button>
					</div>
				</div>
			</form>

			<ul className="list-group">
				{todos.map((item, index) => (
					<li className="list-group-item">
						{item.text}
						<button
							className="btn btn-secondary"
							onClick={() => updateToDo(item.id)}
						>
							edit
						</button>
						<button
							className="btn btn-danger"
							onClick={() => removeFromToDo(item.id)}
						>
							remove
						</button>
					</li>
				))}
			</ul>
		</>
	);
};

export default ToDoList;
