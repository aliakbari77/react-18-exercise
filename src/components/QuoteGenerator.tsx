import React, { useEffect } from "react";
import axios from "axios";

const QuoteGenerator = () => {
	const url =
		"https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

	useEffect(() => {
		axios
			.get(url)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	});

	return <div>QuoteGenerator</div>;
};

export default QuoteGenerator;
