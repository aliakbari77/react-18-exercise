import React, { ChangeEvent, FormEvent, useState } from "react";

interface User {
	name: string;
	email: string;
	age: number;
}

const UserForm = () => {
	const [user, setUser] = useState<User>({
		name: "",
		email: "",
		age: 0,
	});

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		const newUser = {
			...user,
			[name]: value,
		};
		setUser(newUser);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		console.log(user.name, user.email, user.age);
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="exampleInputEmail1">Name</label>
					<input
						type="string"
						name="name"
						className="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						placeholder="Enter Name"
						onChange={handleInputChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputPassword1">Email</label>
					<input
						type="email"
						name="email"
						className="form-control"
						id="exampleInputPassword1"
						placeholder="Enter Email"
						onChange={handleInputChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputPassword1">Age</label>
					<input
						type="number"
						name="age"
						className="form-control"
						id="exampleInputPassword1"
						placeholder="Enter Age"
						onChange={handleInputChange}
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</>
	);
};

export default UserForm;
