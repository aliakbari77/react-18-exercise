import React, { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
	title: z
		.string()
		.min(3, { message: "Title must contain at least 3 chars" }),
});

type FormData = z.infer<typeof schema>;

interface Props {
	onAdd: (title: string) => void;
	onShowForm: () => void;
}

const CustomFormAddProject = ({ onAdd, onShowForm }: Props) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const [title, setTitle] = useState("");

	const onSubmit = (data: FieldValues) => {
		onAdd(data.title);
		setTitle("");
        onShowForm()
	};

	return (
		<>
			<form className="p-3" onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="title">Title</label>
				<input
					{...register("title")}
					type="text"
					className="form-control"
				/>
				{errors.title && (
					<p className="alert alert-danger">{errors.title.message}</p>
				)}
				<button className="btn btn-secondary mt-3">Save</button>
			</form>
		</>
	);
};

export default CustomFormAddProject;
