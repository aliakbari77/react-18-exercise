import React, { useState } from "react";
import CustomListProject from "./CustomListProject";
import CustomFormAddProject from "./CustomFormAddProject";
import CustomListTasks from "./CustomListTasks";
import CustomFormAddTask from "./CustomFormAddTask";
import CustomSearchInput from "./CustomSearchInput";
import CustomSelect from "../todolist-project/CustomSelect";
import CustomSelectInput from "./CustomSelectInput";

interface Project {
	id: number;
	title: string;
}

interface Task {
	project_id: number;
	id: number;
	text: string;
	priority: number;
	completion_status: string;
}

const Home = () => {
	const [projects, setProjects] = useState<Project[]>([
		{
			id: 1,
			title: "project 1",
		},
		{
			id: 2,
			title: "project 2",
		},
	]);
	const [tasks, setTasks] = useState<Task[]>([
		{
			project_id: 1,
			id: 1,
			text: "project 1 - server ui",
			priority: 1,
			completion_status: "to do",
		},
		{
			project_id: 2,
			id: 2,
			text: "project 2 - back end",
			priority: 2,
			completion_status: "in progress",
		},
	]);
	const [showAddProjectForm, setShowAddForm] = useState(false);
	const [selectProjectId, setSelectProjectId] = useState(0);
	const [showAddTaskForm, setShowAddTaskForm] = useState(false);
	const [editItemId, setEditItemId] = useState(0);
	const [searchValue, setSearchValue] = useState("");

	const handleAddProject = (title: string) => {
		setProjects([
			...projects,
			{
				id: Date.now(),
				title: title,
			},
		]);
	};

	const handleSelectProject = (id: number) => {
		setSelectProjectId(id);
	};

	const handleAddTask = (id: number, text: string) => {
		setTasks([
			...tasks,
			{
				project_id: id,
				id: Date.now(),
				text: text,
				priority: 2,
				completion_status: "to do",
			},
		]);
	};

	const handleDeleteTask = (id: number) => {
		setTasks(tasks.filter((item) => item.id !== id));
	};

	const handleEditTask = (id: number, newText: string) => {
		console.log(id, newText);
		setTasks(
			tasks.map((item) =>
				item.id === id ? { ...item, text: newText } : item
			)
		);
	};

	const handleSearchTask = (searchValue: string) => {
		console.log(searchValue);
		setSearchValue(searchValue);
	};

	const visibleTasks = selectProjectId
		? tasks.filter((item) => item.project_id === selectProjectId)
		: tasks;

	const searchTasks = searchValue
		? visibleTasks.filter((item) => item.text.includes(searchValue))
		: visibleTasks;

	return (
		<>
			{showAddProjectForm && (
				<div>
					<CustomFormAddProject
						onAdd={handleAddProject}
						onShowForm={() => setShowAddForm(false)}
					/>
				</div>
			)}
			{showAddTaskForm && (
				<CustomFormAddTask
					projects={projects}
					onAddTask={handleAddTask}
					onShowForm={() => setShowAddTaskForm(false)}
				/>
			)}
			<div className="p-3 d-flex justify-content-between">
				<div>
					<CustomListProject
						projectList={projects}
						onSelectProject={handleSelectProject}
						idSelectProject={selectProjectId}
					/>
				</div>
				<div>
					<div className="d-flex">
						<CustomSearchInput onSearch={handleSearchTask} />
						<CustomSelectInput />
					</div>
					<CustomListTasks
						tasks={searchTasks}
						onDelete={handleDeleteTask}
						onEditId={editItemId}
						setEditId={(id: number) => {
							setEditItemId(id);
						}}
						onEdit={handleEditTask}
						setNullId={() => setEditItemId(0)}
					/>
				</div>
				<div>
					<button
						disabled={showAddTaskForm}
						className={
							showAddProjectForm
								? "btn btn-danger"
								: "btn btn-primary"
						}
						onClick={() => setShowAddForm(!showAddProjectForm)}
					>
						{showAddProjectForm ? "Close" : "Add Project"}
					</button>
					<button
						disabled={showAddProjectForm}
						className={
							showAddTaskForm
								? "btn btn-danger mx-2 "
								: "btn btn-info mx-2 text-white"
						}
						onClick={() => setShowAddTaskForm(!showAddTaskForm)}
					>
						{showAddTaskForm ? "Close" : "Add Task"}
					</button>
				</div>
			</div>
		</>
	);
};

export default Home;
