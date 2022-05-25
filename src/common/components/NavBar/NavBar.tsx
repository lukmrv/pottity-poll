/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import classNames from "classnames";

const NavBar = () => {
	const { t } = useTranslation("header");

	const router = useRouter();
	const { pathname, asPath, query, locale } = router;

	return (
		<>
			<header className="flex justify-center bg-slate-800 border-b-2 px-4 h-[80px] border-slate-500">
				<nav className="flex gap-12 items-center flex-grow max-w-6xl">
					<Link href={`/`} passHref>
						<img src="/logo.png" alt="" className="p-2 max-h-12" />
					</Link>
					<Link href={`/`} passHref>
						<span className="flex items-center h-full text-slate-500 hover:text-white cursor-pointer">
							{t("header.create")}
						</span>
					</Link>
					<Link href={`/`} passHref>
						<span className="flex items-center h-full text-slate-500 hover:text-white cursor-pointer">
							{t("header.about")}
						</span>
					</Link>
					<Link href={`/`} passHref>
						<span className="flex items-center h-full text-slate-500 hover:text-white cursor-pointer">
							{t("header.explore")}
						</span>
					</Link>

					<div className="flex gap-4 ml-auto text-slate-500 ">
						<button
							className={classNames("hover:text-white cursor-pointer", {
								"font-bold text-slate-400": locale !== "pl",
							})}
							onClick={() => {
								router.push({ pathname, query }, asPath, { locale: "en" });
							}}
						>
							EN
						</button>
						<button
							className={classNames("hover:text-white cursor-pointer", {
								"font-bold text-slate-400": locale === "pl",
							})}
							onClick={() => {
								router.push({ pathname, query }, asPath, { locale: "pl" });
							}}
						>
							PL
						</button>
					</div>
				</nav>
			</header>
		</>
	);
};

export default NavBar;
