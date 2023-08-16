import React, { useEffect, useState } from "react";

const Test = () => {
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		console.log("Mount Component");

		return () => {
			console.log("Unmount Component");
		};
	});

	return (
		<>
			{console.log(counter)}
			<div>
				<button
					onClick={() => {
						setCounter(counter + 1);
					}}
				>
					click
				</button>
			</div>
			{counter}
		</>
	);
};

export default Test;
