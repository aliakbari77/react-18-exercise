import React, { ChangeEvent, useRef, useState } from "react";

const CharacterCounter = () => {
	const nameRef = useRef<HTMLInputElement>(null);
	const [counter, setCounter] = useState(0);

	const handleChangeInput = () => {
		if (nameRef.current !== null) {
			console.log("here");
			setCounter(nameRef.current.value.length);
		}
	};

	return (
		<>
			<form className="form-group p-3">
				<div className="mb-3">
					<label htmlFor="name">Name</label>
					<input
						ref={nameRef}
						onChange={handleChangeInput}
						id="name"
						name="name"
						type="text"
						className="form-control"
					/>
				</div>
			</form>
			<p>{counter}</p>
		</>
	);
};

export default CharacterCounter;
