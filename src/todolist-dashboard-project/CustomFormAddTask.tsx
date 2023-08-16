import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";

const schema = z.object({
	text: z.string().min(3, { message: "Text must contain at least 3 chars." }),
	project_id: z.string().nonempty("Please choose on project"),
});

type FormData = z.infer<typeof schema>;

interface Project {
	id: number;
	title: string;
}

interface Props {
	projects: Project[];
	onAddTask: (id: number, text: string) => void;
	onShowForm: () => void;
}

const CustomFormAddTask = ({ projects, onAddTask, onShowForm }: Props) => {
	const [selecteProject, setSeletctedProject] = useState(0);
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const onSubmit = (data: FieldValues) => {
		onAddTask(selecteProject, data.text);
        onShowForm()
	};

	const handleSelectProject = (project_id: string) => {
		setSeletctedProject(parseInt(project_id));
	};

	return (
		<>
			<form className="p-3" onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="text">Text</label>
				<input
					{...register("text")}
					type="text"
					id="text"
					className="form-control"
				/>
				{errors.text && (
					<p className="alert alert-danger">{errors.text.message}</p>
				)}
				<label htmlFor="project-list">Projects</label>
				<select
					{...register("project_id")}
					className="form-select"
					id="project-list"
					onChange={(event) =>
						handleSelectProject(event.target.value)
					}
				>
					<option value="">Select Project</option>
					{projects.map((p) => (
						<option key={p.id} value={p.id}>
							{p.title}
						</option>
					))}
				</select>
				{errors.project_id && (
					<p className="alert alert-danger">
						{errors.project_id.message}
					</p>
				)}
				<button className="btn btn-secondary my-2">Save</button>
			</form>
		</>
	);
};

export default CustomFormAddTask;
