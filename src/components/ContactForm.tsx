import React from "react";
import { z } from "zod";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
	name: z.string().min(3, { message: "Name must at least 3 characters." }),
	email: z.string().email({ message: "Invalid email address." }),
	message: z
		.string()
		.min(10, { message: "Message must at least 10 characters." }),
});

type FormData = z.infer<typeof schema>;

const ContactForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<FormData>({ resolver: zodResolver(schema) });

	const onSubmit = (data: FieldValues) => {
		console.log(data);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} action="" className="p-3">
				<div className="mb-3">
					<label htmlFor="name" className="form-label">Name</label>
					<input {...register("name")} type="text" className="form-control" id="name" />
					{errors.name && <p className="text-danger">{errors.name.message}</p>}
				</div>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">Email</label>
					<input {...register("email")} type="text" className="form-control" id="email" />
					{errors.email && <p className="text-danger">{errors.email.message}</p>}
				</div>
				<div className="mb-3">
					<label htmlFor="message" className="form-label">Message</label>
					<textarea {...register("message")} className="form-control" id="message" rows={3}></textarea>
					{errors.message && <p className="text-danger">{errors.message.message}</p>}
				</div>
				<button className="btn btn-primary">Submit</button>
			</form>
		</>
	);
};

export default ContactForm;
