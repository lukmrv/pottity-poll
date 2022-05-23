/* eslint-disable react/display-name */
import { memo } from "react";
import classNames from "classnames";

type Props = {
	idx?: number;
	value?: string;
	onChange?: Function;
	buttonInside?: boolean;
	// this is workaround for rest attributes
	[x: string]: any;
};

export const TextInput = memo(({ idx, value, onChange, buttonInside, ...rest }: Props) => {
	return (
		<input
			{...rest}
			value={value && value}
			onChange={(e) => onChange && onChange(e.target.value, idx)}
			autoComplete="off"
			className={classNames(
				{ "pr-12": buttonInside },
				"w-full px-3 py-2 rounded-md border-none focus:outline focus:outline-2 text-slate-800 bg-slate-400 placeholder-slate-500 focus:outline-indigo-800"
			)}
		/>
	);
});

TextInput.displayName = "TextInput";

export default TextInput;
