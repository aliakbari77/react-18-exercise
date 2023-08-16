import React, { useEffect, useState } from "react";
import axios from "axios";

interface Data {
	id: number;
	name: string;
	phone: string;
	username: string;
	website: string;
}

const UserList = () => {
	const [users, setUsers] = useState<Data[]>([]);
	const url = "https://jsonplaceholder.typicode.com/users";

	useEffect(() => {
		axios
			.get(url)
			.then((response) => {
				console.log(response);
				setUsers(response.data);
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<table className="table">
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Phone</th>
					<th>Username</th>
					<th>Website</th>
				</tr>
			</thead>
			<tbody>
				{users.map((item) => (
					<tr key={item.id}>
						<td>{item.id}</td>
						<td>{item.name}</td>
						<td>{item.phone}</td>
						<td>{item.username}</td>
						<td>{item.website}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default UserList;
