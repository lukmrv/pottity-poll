import { FaLock } from "react-icons/fa";
import { HiClipboardCopy } from "react-icons/hi";
import copyToClipboard from "@utils/copyToClipboard";
import { useTranslation } from "next-i18next";

type Props = {
	idx?: number;
	value: string;
	// this is workaround for rest attributes
	[x: string]: any;
};

const CopyLink = ({ idx, value, ...rest }: Props) => {
	const { t } = useTranslation("share");

	return (
		<div className="relative w-full max-w-3xl rounded-md">
			<FaLock className="absolute h-full left-4 text-slate-300" />
			<input
				{...rest}
				defaultValue={value}
				disabled
				autoComplete="off"
				className="w-full pl-12 px-3 py-2 rounded-md border-none text-slate-200 bg-slate-500 placeholder-slate-500 outline-none"
			/>
			<button
				className="flex group absolute items-center right-0 top-0 h-full rounded-tr-md rounded-br-md px-4 font-bold  bg-slate-400 text-slate-800  active:text-white hover:bg-slate-300 active:bg-slate-700"
				onClick={() => copyToClipboard(value)}
			>
				<HiClipboardCopy className="text-2xl mr-2 text-slate-700 group-active:text-white" />
				{t("share.copy")}
			</button>
		</div>
	);
};

export default CopyLink;
