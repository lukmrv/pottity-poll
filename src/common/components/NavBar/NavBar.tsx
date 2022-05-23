/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const NavBar = () => {
	return (
		<>
			<header className="flex justify-center bg-slate-800 border-b-2 px-4 h-[80px] border-slate-500">
				<nav className="flex space-x-12 items-center flex-grow max-w-6xl">
					<Link href={`/`} passHref>
						<img src="/logo.png" alt="" className="p-2 max-h-12" />
					</Link>
					<Link href={`/`} passHref>
						<span className="flex items-center h-full text-slate-500 hover:text-white cursor-pointer">
							Create poll
						</span>
					</Link>
					<Link href={`/`} passHref>
						<span className="flex items-center h-full text-slate-500 hover:text-white cursor-pointer">
							About
						</span>
					</Link>
				</nav>
			</header>
		</>
	);
};

export default NavBar;
