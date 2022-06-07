/* eslint-disable @next/next/no-img-element */
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { StylesConfig } from "react-select";
const Select = dynamic(() => import("react-select"), { ssr: false });
import classnames from "classnames";
// import { string } from "yup";
import { FiMenu } from "react-icons/fi";
import Button from "@components/Button/Button";

type Options = {
	value: string;
	label: string;
}[];

const BREAKPOINT_SMALL = 640; //px

function useWindowSize() {
	const [windowSize, setWindowSize] = useState<{
		width: undefined | number;
		height: undefined | number;
	}>({
		width: undefined,
		height: undefined,
	});
	useEffect(() => {
		// Handler to call on window resize
		function handleResize() {
			// Set window width/height to state
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}
		// Add event listener
		window.addEventListener("resize", handleResize);
		// Call handler right away so state gets updated with initial window size
		handleResize();
		// Remove event listener on cleanup
		return () => window.removeEventListener("resize", handleResize);
	}, []); // Empty array ensures that effect is only run on mount
	return windowSize;
}

const colourStyles: StylesConfig = {
	control: (styles) => ({ ...styles, backgroundColor: "rgb(30 41 59)" }),
	option: (styles, { isFocused, isSelected }) => {
		return {
			...styles,
			backgroundColor: isFocused ? "rgb(75 85 99)" : undefined,
			color: isSelected ? "white" : isFocused ? "white" : "white",
		};
	},
	menu: (styles) => ({
		...styles,
		background: "rgb(55 65 81)",
	}),
	input: (styles) => ({ ...styles }),
	placeholder: (styles) => ({ ...styles }),
	singleValue: (styles) => ({ ...styles, color: "white" }),
};

const NavBar = () => {
	// const menuOptionsRef = useRef<RefObject<HTMLDivElement>>();
	const windowSize = useWindowSize();
	const [isMenuHidden, setIsMenuHidden] = useState<boolean>(true);

	const { t } = useTranslation("header");

	const languageOptions: Options = [
		{ value: "en", label: "EN" },
		{ value: "pl", label: "PL" },
	];

	const closeMenu = () => {
		setIsMenuHidden(true);
	};

	useEffect(() => {
		const handleCloseMenuListener = (e: MouseEvent) => {
			if (!isMenuHidden) {
				closeMenu();
			}
		};

		window.addEventListener("click", (e) => handleCloseMenuListener(e));

		return () => {
			window.removeEventListener("click", handleCloseMenuListener);
		};
	}, [isMenuHidden]);

	const router = useRouter();
	const { pathname, asPath, query, locale } = router;

	return (
		<>
			<header className="flex justify-center bg-slate-800 border-b-2 px-4 h-[80px] border-slate-500">
				<nav className="flex sm:gap-12 gap-4 items-center flex-grow max-w-6xl">
					<Link href={`/`} passHref>
						<img src="/logo.png" alt="" className="p-2 max-h-12" />
					</Link>
					{(windowSize.width as number) > BREAKPOINT_SMALL && (
						<>
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
						</>
					)}
					{(windowSize.width as number) < BREAKPOINT_SMALL && (
						<div className="relative">
							<Button
								color="color-theme"
								onClick={(e) => {
									e.stopPropagation();
									setIsMenuHidden(!isMenuHidden);
								}}
							>
								<FiMenu className="text-lg" />
							</Button>
							{/* <!-- Dropdown menu --> */}
							<div
								className={classnames(
									"absolute top-12 z-10 bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700",
									{ hidden: isMenuHidden }
								)}
							>
								<ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
									<li>
										<a
											href="#"
											className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
										>
											{t("header.create")}
										</a>
									</li>
									<li>
										<a
											href="#"
											className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
										>
											{t("header.about")}
										</a>
									</li>
									<li>
										<a
											href="#"
											className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
										>
											{t("header.explore")}
										</a>
									</li>
								</ul>
							</div>
						</div>
					)}

					<div className="flex gap-4 ml-auto text-slate-500 ">
						<Select
							options={languageOptions}
							onChange={(option) =>
								router.push({ pathname, query }, asPath, {
									locale: option.value,
								})
							}
							defaultValue={languageOptions.filter(
								(option) => option.value === locale
							)}
							styles={colourStyles}
						/>
					</div>
				</nav>
			</header>
		</>
	);
};

export default NavBar;
