import React from "react";
import { useTranslation } from "next-i18next";

const Footer = () => {
	const { t } = useTranslation("footer");

	return (
		<>
			<footer className="flex justify-center items-center text-2xl text-slate-500 bg-slate-800 border-t-2 border-slate-500 h-[200px]">
				{t("footer.title")}
			</footer>
		</>
	);
};

export default Footer;
