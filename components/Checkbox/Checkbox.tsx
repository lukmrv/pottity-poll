type Props = {
	onChange?: React.ChangeEventHandler;
	id: string;
	labelText?: string;
	// this is workaround for rest attributes
	[x: string]: any;
};

const Checkbox = ({ labelText, onChange, type, id, ...rest }: Props) => {
	return (
		<div className="flex">
			<label htmlFor={id} className="inline-flex items-center mt-3 cursor-pointer">
				<input
					{...rest}
					onChange={onChange}
					type="checkbox"
					id={id}
					className="focus:ring-3 h-4 w-4 rounded-md accent-indigo-500 hover:accent-indigo-600"
				/>
				<span className="ml-3 text-white font-medium select-none">{labelText}</span>
			</label>
		</div>
	);
};

export default Checkbox;
