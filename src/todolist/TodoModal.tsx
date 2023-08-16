import React from "react";

interface Props {
	title: string;
    onChangeFilter: () => void
}

const TodoModal = ({ title }: Props) => {
	return (
		<div>
			<div
				className="p-4"
				tabIndex={-1}
				role="dialog"
				style={{
					position: "absolute",
					background: "#fff",
					width: "50%",
					boxShadow: "0px 0px 10px gray",
					// border: "1px solid gray",
					left: "25%",
					borderRadius: "10px",
				}}
			>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Edit Item</h5>
						</div>
						<div className="modal-body">
							<input
								type="text"
								className="m-3 form-control"
								placeholder={title}
							/>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="m-1 btn btn-primary"
							>
								Save changes
							</button>
							<button
								type="button"
								className="btn btn-secondary"
								data-dismiss="modal"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TodoModal;
