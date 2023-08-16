import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
	username: z.string().min(3, { message: "Username must at least " }),
	password: z.string().min(4),
});

type FormData = z.infer<typeof schema>;

interface Props {
	onLogin: () => void;
}

const LoginForm = ({ onLogin }: Props) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const onSubmit = () => {
		onLogin();
	};

	return (
		<form
			action=""
			className="form-group"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div>
				<label htmlFor="username">Username</label>
				<input
					{...register("username")}
					type="text"
					className="form-control"
                    />
                    {errors.username && <p className="alert alert-danger">{errors.username.message}</p>}
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<input
					{...register("password")}
					type="password"
					className="form-control"
				/>
                {errors.password && <p className="alert alert-danger">{errors.password.message}</p>}
			</div>
			<button className="btn btn-primary mt-3">Submit</button>
		</form>
	);
};

export default LoginForm;
