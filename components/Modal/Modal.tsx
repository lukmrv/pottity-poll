import { useEffect, useCallback, useRef } from "react";
import ClientOnlyPortal from "@utils/ClientOnlyPortal";
import { CSSTransition } from "react-transition-group";

type Props = {
	title: string;
	showModal: boolean;
	children: React.ReactNode;
	onClose: Function;
};

type KeyboardEvent = {
	charCode: number;
	keyCode: number;
};

// Modal tile is styled here. Children are styled in the place of invocation
export const Modal = ({ showModal, title, children, onClose }: Props) => {
	// this node Ref resolves error with CSSTransitions "findDomNode"
	const nodeRef = useRef(null);

	const closeOnEscapeKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if ((e.charCode || e.keyCode) === 27) {
				onClose();
			}
		},
		[onClose]
	);

	// close modal on ESC key
	useEffect(() => {
		document.body.addEventListener("keydown", closeOnEscapeKeyDown);
		return () => {
			document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
		};
	}, [closeOnEscapeKeyDown]);

	return (
		<ClientOnlyPortal selector="#modal">
			<CSSTransition
				nodeRef={nodeRef}
				in={showModal}
				unmountOnExit
				classNames="modal"
				/* 
				Below "enter" time is set to 0, meaning the modal is not fading it
				Such behaviour is only desired to remove transition between spinner and modal.

				If modal is placed without spinner - will have to adjust this behaviour
				*/
				timeout={{ enter: 0, exit: 150 }}
			>
				<div
					ref={nodeRef}
					className="modal fixed inset-0 bg-slate-600/80"
					onClick={() => onClose()}
				>
					<div
						className="rounded-lg outline outline-4 outline-slate-800 relative max-w-[500px] bg-slate-700 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="p-6 flex items-center justify-center text-2xl font-bold text-white">
							<h4 className="modal-title max-w-[70%] text-center text-green-400">{title}</h4>
							<div className="absolute right-4">
								<button
									className="flex w-auto rounded-md px-4 py-2 hover:text-slate-300 active:outline active:outline-2"
									onClick={() => onClose()}
								>
									&#10005;
								</button>
							</div>
						</div>
						<div className="p-6 border-t-2 border-slate-500">{children}</div>
					</div>
				</div>
			</CSSTransition>
		</ClientOnlyPortal>
	);
};

export default Modal;
