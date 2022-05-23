import React, { CSSProperties, useRef } from "react";
import { secondaryColorDefaultProps, SecondaryColorSpinnerProps } from "./spinnerHelpers";
import { withSharedProps } from "./withSharedProps";
import ClientOnlyPortal from "@utils/ClientOnlyPortal";
import { CSSTransition } from "react-transition-group";

const Spinner = ({
	secondaryColor,
	speed,
	enabled,
	still,
	thickness,
	...svgProps
}: SecondaryColorSpinnerProps) => {
	// this node Ref resolves error with CSSTransitions "findDomNode"
	const nodeRef = useRef(null);

	const strokeWidth = 4 * ((thickness as number) / 100);
	const circleStyle: CSSProperties = !still
		? { animation: `spinner-circular ${140 / (speed as number)}s linear infinite` }
		: {};

	return (
		<ClientOnlyPortal selector="#spinner">
			<CSSTransition
				nodeRef={nodeRef}
				unmountOnExit
				in={enabled}
				classNames="spinner"
				/* 
				Below "exit" time is set to 0, meaning the spinner is not fading out
				Such behaviour is only desired to remove transition between spinner and modal.

				If spinner is placed without modal (and if staying on the same page) - will have to adjust this behaviour
				*/
				timeout={{ enter: 150, exit: 0 }}
			>
				<div
					ref={nodeRef}
					className="spinner fixed w-full h-screen inset-0 bg-slate-600/80"
				>
					<div className="w-full h-full">
						<svg
							className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
							fill="none"
							{...svgProps}
							viewBox="0 0 66 66"
						>
							<circle
								cx="33"
								cy="33"
								fill="none"
								r="28"
								stroke={secondaryColor}
								strokeWidth={strokeWidth}
							/>
							<circle
								cx="33"
								cy="33"
								fill="none"
								r="28"
								stroke="currentColor"
								strokeDasharray="1, 174"
								strokeDashoffset="306"
								strokeLinecap="round"
								strokeWidth={strokeWidth}
								style={circleStyle}
							/>
						</svg>
					</div>
				</div>
			</CSSTransition>
		</ClientOnlyPortal>
	);
};

Spinner.defaultProps = secondaryColorDefaultProps;

export default withSharedProps(Spinner);
