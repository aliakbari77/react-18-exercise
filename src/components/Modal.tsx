import React from "react";

interface Props {
	title: string;
	body: string;
	state: string;
	onClose: () => void;
}

const Modal = ({ title, body, state, onClose }: Props) => {
	return (
		<div
			tabIndex={-1}
			role="dialog"
			className="fade show mb-3 p-3"
			style={{
				border: "1px solid gray",
				borderRadius: "5px",
				boxShadow: "0 0 3px gray",
			}}
		>
			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{title}</h5>
					</div>
					<div className="modal-body">
						<p>{body}</p>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-primary m-1"
							onClick={onClose}
						>
							Continue
						</button>
						<button
							type="button"
							className="btn btn-secondary"
							data-dismiss="modal"
							onClick={onClose}
						>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
