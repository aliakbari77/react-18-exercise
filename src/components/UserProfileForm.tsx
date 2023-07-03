import React, { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

interface UserProfile {
	[key: string]:
		| string
		| number
		| boolean
		| {
				[key: string]: string | number | boolean;
		  };
}

const UserProfileForm = () => {
	const [userProfile, setUserProfile] = useState<UserProfile>({
		name: "",
		email: "",
		age: 0,
		sendEmail: false,
		address: {
			street: "",
			city: "",
			state: "",
			postalCode: "",
		},
	});

	const handleChangeInput = (
		event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value, type } = event.target;
		let inputValue: string | number | boolean = value;

		if (type === "checkbox") {
			const target = event.target as HTMLInputElement;
			inputValue = target.checked;
		}

		let newUserProfile;

		if (name.includes(".")) {
			const [outerKey, innterKey] = name.split(".");
			newUserProfile = {
				...userProfile,
				[outerKey]: {
					...(userProfile[outerKey as keyof UserProfile] as object),
					[innterKey]: value,
				},
			};
			setUserProfile(newUserProfile);
		} else {
			newUserProfile = {
				...userProfile,
				[name]: inputValue,
			};
			setUserProfile(newUserProfile);
		}
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		console.log(userProfile);
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="row">
					<div className="form-group col-md-6">
						<label htmlFor="inputEmail4">Name</label>
						<input
							type="text"
							name="userProfile.name"
							className="form-control"
							id="inputEmail4"
							placeholder="Email"
							onChange={handleChangeInput}
						/>
					</div>
					<div className="form-group col-md-6">
						<label htmlFor="inputPassword4">Email</label>
						<input
							type="text"
							name="userProfile.email"
							className="form-control"
							id="inputPassword4"
							placeholder="Email"
							onChange={handleChangeInput}
						/>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="inputAddress">Address</label>
					<input
						type="text"
						name="userProfile.address.street"
						className="form-control"
						id="inputAddress"
						placeholder="1234 Main St"
						onChange={handleChangeInput}
					/>
				</div>
				<div className="row">
					<div className="form-group col-md-6">
						<label htmlFor="inputCity">City</label>
						<input
							type="text"
							name="userProfile.address.city"
							className="form-control"
							id="inputCity"
							onChange={handleChangeInput}
						/>
					</div>
					<div className="form-group col-md-4">
						<label htmlFor="inputState">State</label>
						<select
							id="inputState"
							className="form-control"
							name="userProfile.address.state"
							onChange={handleChangeInput}
						>
							<option value={""}>Choose City</option>
							<option value={"Esfahan"}>Esfahan</option>
							<option value={"Yazd"}>Yazd</option>
							<option value={"Mashhad"}>Mashhad</option>
							<option value={"Tehran"}>Tehran</option>
							<option value={"Shiraz"}>Shiraz</option>
						</select>
					</div>
					<div className="form-group col-md-2">
						<label htmlFor="inputZip">Zip</label>
						<input
							type="text"
							name="userProfile.address.postalCode"
							className="form-control"
							id="inputZip"
							onChange={handleChangeInput}
						/>
					</div>
				</div>
				<div className="form-group">
					<div className="form-check">
						<input
							className="form-check-input"
							name="userProfile.sendEmail"
							type="checkbox"
							id="gridCheck"
							onChange={handleChangeInput}
						/>
						<label className="form-check-label" htmlFor="gridCheck">
							Send Email
						</label>
					</div>
				</div>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</>
	);
};

export default UserProfileForm;
