import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

interface Country {
	name: { common: string };
	population: number;
	region: string;
}

const CountryInfoApp = () => {
	const [countryCode, setCountryCode] = useState("");
	const [error, setError] = useState("");
	const [country, setCountry] = useState<Country[]>([]);

	const url = `https://restcountries.com/v3/alpha/${countryCode}`;

	useEffect(() => {
		const fetchCountry = async () => {
			try {
				const res = await axios.get(url);
				console.log(res.data);
				setCountry(res.data);
				setError("");
			} catch (err) {
				// setError((err as AxiosError).message);
				setError("Please Choose Country");
			}
		};

		fetchCountry();
	}, [countryCode]);

	return (
		<>
			{console.log(country)}
			<div className="p-3">
				{error && <p className="text-danger">{error}</p>}
				<select
					className="form-select"
					onChange={(event) => {
						setCountryCode(event.target.value);
						setError("Get Data...");
					}}
				>
					<option value="">Select Country</option>
					<option value="IR">Iran</option>
					<option value="USA">United State</option>
				</select>
				<p>{country[0]?.name.common}</p>
				<p>{country[0]?.population}</p>
				<p>{country[0]?.region}</p>
			</div>
		</>
	);
};

export default CountryInfoApp;
