/* eslint-disable react/display-name */
import { memo } from "react";

type Props = {
	onChange?: React.ChangeEventHandler;
	id: string;
	labelText?: string;
	// this is workaround for rest attributes
	[x: string]: any;
};

export const Toggle = memo(({ labelText, onChange, type, id, ...rest }: Props) => {
	return (
		<div className="flex">
			<label htmlFor={id} className="flex cursor-pointer">
				<div className="relative">
					<input {...rest} onChange={onChange} type="checkbox" id={id} className="sr-only" />
					<div className="dot-bg block bg-slate-400 w-10 h-6 rounded-full"></div>
					<div className="dot absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition"></div>
				</div>
				<div className="ml-3 text-white font-medium select-none">{labelText}</div>
			</label>
		</div>
	);
});

Toggle.displayName = "Toggle";

export default Toggle;
