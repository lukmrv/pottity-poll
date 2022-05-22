type Props = {
	mainText: string;
	subText?: string;
};

const HeadSection = ({ mainText, subText }: Props) => {
	return (
		<div className="flex flex-col items-center">
			<span className="text-3xl font-bold text-white">{mainText}</span>
			{subText && <span className="text-1xl font-medium text-slate-500">{subText}</span>}
		</div>
	);
};

export default HeadSection;
