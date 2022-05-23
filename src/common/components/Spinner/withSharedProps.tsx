import React, { ComponentType, CSSProperties } from "react";

const defaultProps = {
	color: "#38ad48" as CSSProperties["color"],
	enabled: false,
	size: 50 as CSSProperties["width"] | undefined,
	style: {} as CSSProperties,
};
const normalizeSize = (size: CSSProperties["width"]) =>
	parseFloat(size?.toString() || "0").toString() === size?.toString()
		? `${size}px`
		: size?.toString();

export type SpinnersProps = Partial<typeof defaultProps>;

export const withSharedProps = <P extends SpinnersProps>(Component: ComponentType<P>) => {
	const Wrapper = (props: P) => {
		const { color, size, style, ...otherProps } = props;
		const componentProps = {
			...otherProps,

			style: {
				color,
				overflow: "visible",
				width: normalizeSize(size),
				...style,
			},
		};

		return <Component {...(componentProps as P)} />;
	};

	Wrapper.defaultProps = defaultProps;

	return Wrapper;
};
