import React from "react";

interface Project {
	id: number;
	title: string;
}

interface Props {
	projectList: Project[];
	onSelectProject: (id: number) => void;
	idSelectProject: number;
}

const CustomListProject = ({
	projectList,
	onSelectProject,
	idSelectProject,
}: Props) => {
	return (
		<>
			<ul className="list-group">
				<li
					className={
						idSelectProject === 0
							? "list-group-item active"
							: "list-group-item"
					}
					onClick={() => onSelectProject(0)}
				>
					All
				</li>
				{projectList.map((item) => (
					<li
						key={item.id}
						className={
							idSelectProject == item.id
								? "list-group-item" + " active"
								: "list-group-item"
						}
						onClick={() => onSelectProject(item.id)}
					>
						{item.title}
					</li>
				))}
			</ul>
		</>
	);
};

export default CustomListProject;
