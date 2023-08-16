import React, { ChangeEvent, useState } from "react";
import { z } from "zod";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
	description: z
		.string()
		.min(3, { message: "Description should be at least 3 characters" }),
	amount: z
		.number({ invalid_type_error: "Amount field is required" })
		.positive({ message: "Amount must be positive" }),
	category: z.string().nonempty("Category is required"),
});

type FormData = z.infer<typeof schema>;

const ExpenseTracker = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});
	const [products, setProducts] = useState([
		{
			id: Date.now(),
			description: "Milk",
			amount: 5,
			category: "Groceries",
		},
	]);
	const [filtered, setFiltered] = useState("");
	const [total, setTotal] = useState(5);

	const onSubmit = (data: FieldValues) => {
		const newProduct = {
			id: Date.now(),
			description: data.description,
			amount: data.amount,
			category: data.category,
		};
		setProducts([...products, newProduct]);
		setTotal(total + data.amount);
	};

	const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const currentFilter = event.target.value;
		// const filteredProduct = products.filter(
		// 	(item, index) => item.category === currentFilter
		// );
		// if (currentFilter === "all") {
		// 	setFiltered(products);
		// 	return;
		// }
		// setFiltered(filteredProduct);
		// setProducts(filteredProduct);
		const filteredItems = products.filter(
			(item, index) => filtered === "" || item.category === filtered
		);
		let c = 0;
		for (let i of filteredItems) {
			c = c + i.amount;
		}
		setFiltered(currentFilter);
		setTotal(c);
	};

	const handleDeleteProduct = (id: number) => {
		const newProduct = products.filter((item, index) => item.id !== id);
		const currentProduct = products.find((item, index) => item.id === id);
		setProducts(newProduct);
		if (currentProduct) {
			setTotal(total - currentProduct?.amount);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="p-3">
				<div className="mb-3">
					<label htmlFor="description" className="form-label">
						Description
					</label>
					<input
						{...register("description")}
						type="text"
						className="form-control"
						id="description"
					/>
					{errors.description && (
						<p className="text-danger">
							{errors.description.message}
						</p>
					)}
				</div>
				<div className="mb-3">
					<label htmlFor="amount" className="form-label">
						Amount
					</label>
					<input
						{...register("amount", { valueAsNumber: true })}
						type="number"
						className="form-control"
						id="amount"
					/>
					{errors.amount && (
						<p className="text-danger">{errors.amount.message}</p>
					)}
				</div>
				<div className="mb-3">
					<label htmlFor="category">Category</label>
					<select
						{...register("category")}
						className="form-control"
						id="category"
					>
						<option value=""></option>
						<option value="Groceries">Groceries</option>
						<option value="Utilities">Utilities</option>
						<option value="Entertainment">Entertainment</option>
					</select>
					{errors.category && (
						<p className="text-danger">{errors.category.message}</p>
					)}
				</div>
				<button className="btn btn-primary">Submit</button>
			</form>
			<form className="p-3">
				<select onChange={handleFilterChange} className="form-control">
					<option value="">All Categories</option>
					<option value="Groceries">Groceries</option>
					<option value="Utilities">Utilities</option>
					<option value="Entertainment">Entertainment</option>
				</select>
			</form>
			{products.filter(
				(item, index) => filtered === "" || item.category === filtered
			).length > 0 && (
				<div className="p-3">
					<table className="table table-bordered">
						<thead>
							<tr>
								<th scope="col">Description</th>
								<th scope="col">Amount</th>
								<th scope="col">Category</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{products
								.filter(
									(item, index) =>
										filtered === "" ||
										item.category === filtered
								)
								.map((item, index) => (
									<tr key={index}>
										<td>{item.description}</td>
										<td>{"$" + item.amount.toFixed(2)}</td>
										<td>{item.category}</td>
										<td>
											<button
												className="btn btn-outline-danger"
												onClick={(event) => {
													event.preventDefault();
													handleDeleteProduct(
														item.id
													);
												}}
											>
												Delete
											</button>
										</td>
									</tr>
								))}
							<tr>
								<td>Total</td>
								<td>{"$" + total.toFixed(2)}</td>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>
			)}
		</>
	);
};

export default ExpenseTracker;
