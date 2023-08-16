import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldValues } from "react-hook-form";

const schema = z.object({
	title: z
		.string()
		.min(5, { message: "Title must at least 5 characters" })
		.max(20),
	status: z.enum(["In Progress", "Testing", "ToDo"], {
		errorMap: () => ({ message: "Status is required" }),
	}),
	completed: z.string({invalid_type_error: "Copmleted status is required"}),
});

type FormData = z.infer<typeof schema>;

interface Props {
	onSubmit: (data: FormData) => void;
}

const TodoForm = ({ onSubmit }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	return (
		<>
			<div className="m-1">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="mb-3">
						<label htmlFor="title" className="form-label">
							Title
						</label>
						<input
							{...register("title")}
							type="text"
							className="form-control"
							id="title"
						/>
						{errors.title && (
							<p className="text-danger">
								{errors.title.message}
							</p>
						)}
					</div>
					<div className="mb-3">
						<label htmlFor="status" className="form-label">
							Status
						</label>
						<select
							{...register("status")}
							className="form-select"
							id="status"
						>
							<option value=""></option>
							<option value="In Progress">In Progress</option>
							<option value="Testing">Testing</option>
							<option value="ToDo">ToDo</option>
						</select>
						{errors.status && (
							<p className="text-danger">
								{errors.status.message}
							</p>
						)}
					</div>
					<div className="mb-3">
						<p>Completed</p>
						<input
							{...register("completed")}
							type="radio"
							id="yes"
                            value="yes"
						/>
						<label className="m-2" htmlFor="yes">
							Yes
						</label>
						<input
							{...register("completed")}
							type="radio"
							id="no"
                            value="no"
						/>
						<label className="m-2" htmlFor="yes">
							No
						</label>
						{errors.completed && (
							<p className="text-danger">
								{errors.completed.message}
							</p>
						)}
					</div>
					<button className="btn btn-primary">Submit</button>
				</form>
			</div>
		</>
	);
};

export default TodoForm;
