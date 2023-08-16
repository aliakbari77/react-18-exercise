import React, { useEffect, useState } from "react";

const ProductList = ({ category }: { category: string | undefined }) => {
	const [myState, setMyState] = useState<string[]>([]);

	useEffect(() => {
		console.log("Fetching data ", category);
		setMyState([""]);
	}, [category]);

	return <div>ProductList</div>;
};

export default ProductList;
