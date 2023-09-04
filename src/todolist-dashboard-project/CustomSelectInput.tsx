import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";

interface Props {
	onSelectPriority: (priority: number) => void;
}

const schema = z.object({
	priority: z.number(),
});

type FormData = z.infer<typeof schema>;

const CustomSelectInput = ({ onSelectPriority }: Props) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const onSubmit = (data: FieldValues) => {
		console.log(data);
	};

	const handleChangePrority = (priority: number) => {
		onSelectPriority(priority);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<select
				{...register("priority")}
				name=""
				id="priority"
				className="form-select"
				onChange={(e) => handleChangePrority(parseInt(e.target.value))}
			>
				<option value="">Select Priority</option>
				<option value={1}>High</option>
				<option value={2}>Medium</option>
				<option value={3}>Low</option>
			</select>
		</form>
	);
};

export default CustomSelectInput;
