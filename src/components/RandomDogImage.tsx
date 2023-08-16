import React, { useEffect, useState } from "react";
import axios from "axios";

const url = "https://dog.ceo/api/breeds/image/random";

const RandomDogImage = () => {
	const [dogImage, setDogImage] = useState("");

	useEffect(() => {
		axios
			.get<{ message: string }>(url)
			.then((res) => {
				setDogImage(res.data.message);
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div>
			<h1>Random Dog Image</h1>
			{dogImage && <img src={dogImage} alt="Random Dog" />}
		</div>
	);
};

export default RandomDogImage;
