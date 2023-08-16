import React, { useState } from "react";
import CustomForm from "./CustomForm";
import Todo from "./Todo.interface";
import CustomList from "./CustomList";
import CustomSelect from "./CustomSelect";

const TodoList = () => {
	const [todoList, setTodoList] = useState<Todo[]>([
		{
			id: 1,
			title: "test",
			completed: true,
		},
		{
			id: 2,
			title: "test2",
			completed: false,
		},
	]);
	const [filterBy, setFilterBy] = useState("");

	const handleToggleItem = (id: number) => {
		setTodoList(
			todoList.map((item) =>
				item.id === id ? { ...item, completed: !item.completed } : item
			)
		);
	};

	const handleAddItem = (title: string) => {
		const newItem: Todo = {
			id: Date.now(),
			title: title,
			completed: false,
		};
		setTodoList([newItem, ...todoList]);
	};

	const handleEditItem = (id: number) => {
		setTodoList(
			todoList.map((item) =>
				item.id === id ? { ...item, title: "edited" } : item
			)
		);
	};

	const handleDeleteItem = (id: number) => {
		setTodoList(todoList.filter((item) => item.id !== id));
	};

	const handleClearList = () => {
		setTodoList([]);
	};

	const handleFilter = (status: string) => {
		setFilterBy(status);
	};

	const visibleItems = filterBy
		? todoList.filter((item) => {
				if (filterBy == "completed") {
					return item.completed == true;
				}
				return item.completed == false;
		  })
		: todoList;

	return (
		<>
			<CustomForm onAdd={handleAddItem} />
			<CustomSelect onChangeFilter={handleFilter} />
			<CustomList
				items={visibleItems}
				onToggle={handleToggleItem}
				onEdit={handleEditItem}
				onDelete={handleDeleteItem}
				onClearList={handleClearList}
			/>
		</>
	);
};

export default TodoList;
