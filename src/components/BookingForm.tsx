import React from "react";
import { z } from "zod";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
	fullName: z
		.string()
		.min(5, { message: "Full Name must contain at least 5 characters." }),
	email: z.string().email({ message: "Invalid Email Address." }),
	phone: z
		.string()
		.min(8, { message: "Phone number must contain 8 numbers." }),
	startDate: z.string().nonempty("Start date is required."),
	endDate: z.string().nonempty("End date is required."),
	guests: z
		.number({ invalid_type_error: "Guests field is required" })
		.positive({ message: "Number of guests must be a positive number." }),
	category: z.string().nonempty("Category can not empty"),
});

type FormData = z.infer<typeof schema>;

const BookingForm = () => {
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
					<label htmlFor="full-name" className="form-label">
						Full Name
					</label>
					<input
						{...register("fullName")}
						type="text"
						className="form-control"
						id="full-name"
					/>
					{errors.fullName && (
						<p className="text-danger">{errors.fullName.message}</p>
					)}
				</div>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						Email
					</label>
					<input
						{...register("email")}
						type="text"
						className="form-control"
						id="email"
					/>
					{errors.email && (
						<p className="text-danger">{errors.email.message}</p>
					)}
				</div>
				<div className="mb-3">
					<label htmlFor="phone" className="form-label">
						Phone
					</label>
					<input
						{...register("phone")}
						type="text"
						className="form-control"
						id="phone"
					/>
					{errors.phone && (
						<p className="text-danger">{errors.phone.message}</p>
					)}
				</div>
				<div className="mb-3">
					<label htmlFor="start-date" className="form-label">
						Start Date
					</label>
					<input
						{...register("startDate")}
						type="text"
						className="form-control"
						id="start-date"
					/>
					{errors.startDate && (
						<p className="text-danger">
							{errors.startDate.message}
						</p>
					)}
				</div>
				<div className="mb-3">
					<label htmlFor="end-date" className="form-label">
						End Date
					</label>
					<input
						{...register("endDate")}
						type="text"
						className="form-control"
						id="end-date"
					/>
					{errors.endDate && (
						<p className="text-danger">{errors.endDate.message}</p>
					)}
				</div>
				<div className="mb-3">
					<label htmlFor="guests" className="form-label">
						Guests
					</label>
					<input
						{...register("guests", { valueAsNumber: true })}
						type="number"
						className="form-control"
						id="guests"
					/>
					{errors.guests && (
						<p className="text-danger">{errors.guests?.message}</p>
					)}
				</div>
				<div className="mb-3">
					<label htmlFor="category" className="form-label">
						Category
					</label>
					<select
						{...register("category")}
						className="custom-select form-control"
						id="category"
					>
						<option value="">Select the Category</option>
						<option value="drama">Drama</option>
						<option value="sci-fi">Sci-Fi</option>
						<option value="science">Science</option>
					</select>
					{errors.category && (
						<p className="text-danger">{errors.category.message}</p>
					)}
				</div>
				<button className="btn btn-primary">Submit</button>
			</form>
		</>
	);
};

export default BookingForm;
