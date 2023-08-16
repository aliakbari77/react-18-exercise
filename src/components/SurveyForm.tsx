import React from "react";
import { z } from "zod";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
	name: z.string().min(5, { message: "Name must at least 5 characters" }),
	gender: z.string().nonempty("Gender is required"),
	interests: z
		.array(z.string().nonempty("Interests is required"))
		.nonempty("Please check one of item"),
	agreement: z.boolean().refine((value) => value === true, {
		message: "You must agree to the terms and conditions",
	}),
	country: z.string().nonempty("Please choose on country"),
});

type FormData = z.infer<typeof schema>;

const SurveyForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const onSubmit = (data: FieldValues) => {
		console.log(data);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="p-3">
				<div className="mb-3">
					<label htmlFor="name" className="form-label">
						Name
					</label>
					<input
						{...register("name")}
						type="text"
						className="form-control"
						id="name"
					/>
					{errors.name && (
						<p className="text-danger">{errors.name.message}</p>
					)}
				</div>
				<div className="mb-3">
					<p className="form-label">Gender</p>
					<input
						{...register("gender")}
						type="radio"
						className=""
						value="male"
					/>
					<label>Male</label>
					<input
						{...register("gender")}
						type="radio"
						className=""
						value="female"
					/>
					<label>Female</label>
					{errors.gender && (
						<p className="text-danger">{errors.gender.message}</p>
					)}
				</div>
				<div className="mb-3">
					<p className="form-label">Interests</p>
					<input
						{...register("interests")}
						type="checkbox"
						value="sport"
					/>
					<label>Sport</label>
					<input
						{...register("interests")}
						type="checkbox"
						value="music"
					/>
					<label>Music</label>
					<input
						{...register("interests")}
						type="checkbox"
						value="movie"
					/>
					<label>Movie</label>
					{errors.interests && (
						<p className="text-danger">
							{errors.interests.message}
						</p>
					)}
				</div>
				<div className="mb-3">
					<input
						{...register("agreement")}
						type="checkbox"
						id="agreement"
					/>
					<label htmlFor="agreement" className="form-label">
						I agree to the terms and conditions
					</label>
					{errors.agreement && (
						<p className="text-danger">
							{errors.agreement.message}
						</p>
					)}
				</div>
				<div className="mb-3">
					<p className="form-label">Country</p>
					<select {...register("country")} className="form-control">
						<option value="">Select Country</option>
						<option value="iran">Iran</option>
						<option value="germany">Germany</option>
						<option value="spania">Spania</option>
					</select>
					{errors.country && <p className="text-danger">{errors.country.message}</p>}
				</div>
				<button className="btn btn-primary">Submit</button>
			</form>
		</>
	);
};

export default SurveyForm;
