import Link from "next/link";

import classNames from "classnames";

type Props = {
	children: React.ReactNode | React.ReactNode[];
	to: string;
	color: "color-main" | "color-accent" | "color-theme";
};

const StyledLink = ({ to, color, children }: Props) => {
	return (
		<Link href={to} passHref>
			<a
				href=""
				className={classNames(
					{ [color]: true },
					"flex justify-center items-center shrink w-auto rounded-md px-4 py-2 active:outline active:outline-2"
				)}
			>
				{children}
			</a>
		</Link>
	);
};

export default StyledLink;
