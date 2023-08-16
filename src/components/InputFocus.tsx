import React, { FormEvent, useRef } from "react";

const InputFocus = () => {
	const nameRef = useRef<HTMLInputElement>(null);
	const familyRef = useRef<HTMLInputElement>(null);
	const ageRef = useRef<HTMLInputElement>(null);

	const person = {
		name: "",
		family: "",
		age: 0,
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (
			nameRef.current !== null &&
			familyRef.current !== null &&
			ageRef.current !== null
		) {
			person.name = nameRef.current.value;
			person.family = familyRef.current.value;
			person.age = parseInt(ageRef.current.value);
		}
		console.log(person);
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="form-group p-md-3">
				<div className="mb-3">
					<label htmlFor="name">Name</label>
					<input
						type="text"
						className="form-control"
						id="name"
						name="name"
						ref={nameRef}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="family">Family</label>
					<input
						ref={familyRef}
						id="family"
						name="family"
						type="text"
						className="form-control"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="age">Age</label>
					<input
						ref={ageRef}
						type="number"
						className="form-control"
						id="age"
						name="age"
					/>
				</div>
				<button className="btn btn-primary" type="submit">
					Submit
				</button>
			</form>
		</>
	);
};

export default InputFocus;
