import { useState } from "react";
import Home from "./todolist-dashboard-project/Home";
import Layout from "./todolist-dashboard-project/Layout";
import LoginForm from "./todolist-dashboard-project/LoginForm";
import NoPage from "./todolist-dashboard-project/NoPage";
import Tasks from "./todolist-dashboard-project/Tasks";
import TodoList from "./todolist-project/TodoList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Logout from "./todolist-project/Logout";

const App = () => {
	const [user, setUser] = useState({
		username: "",
		password: "",
		loginState: false,
	});

	const handleUserLogin = () => {
		setUser({ ...user, loginState: true });
	};

	// if (!user.loginState) {
	// 	return <LoginForm onLogin={handleUserLogin} />;
	// }
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="logout" element={<Logout/>}/>
						<Route path="tasks" element={<Tasks />} />
						<Route path="*" element={<NoPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
