import React, { useEffect, useState } from "react";
import axios from "axios";

const JokeOfTheDay = () => {
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setSeconds((prevSeconds) => prevSeconds + 1);
		}, 1000);

		return () => clearInterval(interval);
	});

	return (
		<div>
			<h1>Timer App</h1>
			<p>Elapsed Time: {seconds} seconds</p>
		</div>
	);
};

export default JokeOfTheDay;
