import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
	title: z.string().min(3, { message: "Title Must be at least 3 chars" }),
});

type FormData = z.infer<typeof schema>;

interface Props {
	onAdd: (title: string) => void;
}

const CustomForm = ({ onAdd }: Props) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const onSubmit = (data: FieldValues) => {
		onAdd(data.title);
	};

	return (
		<>
			<form className="p-3" onSubmit={handleSubmit(onSubmit)}>
				<div className="form-group">
					<label htmlFor="title">Title</label>
					<input
						{...register("title")}
						type="text"
						className="form-control mt-2 mb-2"
						id="title"
					/>
					{errors.title && (
						<p className="alert alert-danger">
							{errors.title.message}
						</p>
					)}
				</div>
				<div className="d-flex justify-content-between">
					<button type="submit" className="btn btn-primary">
						Add
					</button>
				</div>
			</form>
		</>
	);
};

export default CustomForm;
