import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
				<div className="collapse navbar-collapse">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link className="nav-link" to={"/"}>
								Home
							</Link>
						</li>
						<li>
							<Link className="nav-link" to={"/tasks"}>
								Tasks
							</Link>
						</li>
                        <li>
                            <Link className="nav-link" to={"/logout"}>
                                Logout
                            </Link>
                        </li>
					</ul>
				</div>
			</nav>
			<Outlet />
		</>
	);
};

export default Layout;
