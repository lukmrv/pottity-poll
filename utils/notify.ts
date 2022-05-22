import { toast } from "react-toastify";

const notify = (
	type: "info" | "success" | "warning" | "error",
	notificationMessage: string,
	position:
		| "top-left"
		| "top-right"
		| "top-center"
		| "bottom-left"
		| "bottom-right"
		| "bottom-center",
	duration?: number
) => {
	toast[type](`${notificationMessage}`, {
		position: position,
		autoClose: duration || 4500,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
	});
};

export default notify;
