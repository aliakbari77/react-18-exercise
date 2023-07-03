import React, { ChangeEvent, FormEvent, useState } from "react";

interface FormData {
	[key: string]: string | number | boolean;
}

const DynamicForm = () => {
	const [input, setInput] = useState<FormData>({
		name: "",
		password: "",
		age: 0,
		checkStatus: false,
	});

	const handleInputChange = (
		event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		console.log(event.target);
		const { name, value, type } = event.target;
		let inputValue: string | number | boolean = value;

		if (type === "checkbox") {
			const target = event.target as HTMLInputElement;
			inputValue = target.checked;
		}

		const newInput = {
			...input,
			[name]: inputValue,
		};

		setInput(newInput);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(input);
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="exampleInputEmail1">Name</label>
					<input
						type="text"
						className="form-control"
						name="name"
						aria-describedby="emailHelp"
						placeholder="Enter Name"
						onChange={handleInputChange}
					/>
					<small id="emailHelp" className="form-text text-muted">
						We'll never share your email with anyone else.
					</small>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputPassword1">Password</label>
					<input
						type="password"
						name="password"
						className="form-control"
						placeholder="Enter Password"
						onChange={handleInputChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputPassword1">Age</label>
					<input
						type="number"
						name="age"
						className="form-control"
						placeholder="Enter Age"
						onChange={handleInputChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="exampleFormControlSelect1">
						Example select
					</label>
					<select
						className="form-control"
						id="exampleFormControlSelect1"
						onChange={handleInputChange}
					>
						<option value="">Select Number</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
					</select>
				</div>
				<div className="form-check">
					<input
						type="checkbox"
						className="form-check-input"
						onChange={handleInputChange}
						name="checkStatus"
					/>
					<label className="form-check-label" htmlFor="exampleCheck1">
						Check me out
					</label>
				</div>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</>
	);
};

export default DynamicForm;
