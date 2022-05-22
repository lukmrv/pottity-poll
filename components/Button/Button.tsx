import classNames from "classnames";

type Props = {
	children: React.ReactNode;
	color: "color-main" | "color-accent" | "color-theme";
	onClick?: React.MouseEventHandler;
	buttonInside?: boolean;
	disabled?: boolean;
};

const Button = ({ onClick, children, color, buttonInside, disabled }: Props) => {
	return (
		<button
			onClick={onClick}
			className={classNames(
				{ "absolute right-0 scale-75": buttonInside },
				{ [color]: true },
				{ "pointer-events-none select-none opacity-50": disabled },
				"flex justify-center items-center shrink w-auto rounded-md px-4 py-2 active:outline active:outline-2"
			)}
		>
			{children}
		</button>
	);
};

export default Button;
