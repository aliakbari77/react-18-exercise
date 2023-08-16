import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";

interface Data {
	type1: string;
	type2: number;
	type3: {};
	type4: boolean;
}

const ReusableFetchData = ({ url }: { url: string }) => {
	const [sample, setSample] = useState<Data>();
	const [error, setError] = useState("");

	useEffect(() => {
		const abortController = new AbortController();
		const fetchData = async () => {
			try {
				const res = await axios.get(url, {
					signal: abortController.signal,
				});
				setSample(res.data);
				setError("");
			} catch (err) {
				setError((err as AxiosError).message);
			}
		};

		fetchData();

		return () => {
			abortController.abort();
		};
	});

	return <div>ReusableFetchData</div>;
};

export default ReusableFetchData;
