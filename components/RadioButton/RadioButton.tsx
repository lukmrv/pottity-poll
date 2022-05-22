type Props = {
	onChange?: React.ChangeEventHandler;
	id: string;
	labelText?: string;
	// this is workaround for rest attributes
	[x: string]: any;
};

const RadioButton = ({ labelText, onChange, type, id, ...rest }: Props) => {
	return (
		<div className="flex">
			<label htmlFor={id} className="inline-flex items-center mt-3 cursor-pointer">
				<input
					{...rest}
					onChange={onChange}
					type="radio"
					id={id}
					className="form-radio h-5 w-5 text-gray-600 accent-indigo-500 hover:accent-indigo-600"
				/>
				<span className="ml-3 text-white font-medium select-none">{labelText}</span>
			</label>
		</div>
	);
};

export default RadioButton;
