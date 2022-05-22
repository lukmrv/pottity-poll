import Meta from "@components/Meta/Meta";
import NavBar from "@components/NavBar/NavBar";
import Footer from "@components/Footer/Footer";

type Props = {
	children: JSX.Element | JSX.Element[];
};

const Layout = ({ children }: Props) => {
	return (
		<>
			<Meta />
			<NavBar />
			<div className="body min-h-[calc(100vh_-_280px)] bg-slate-800 px-4 py-16 gap-4">
				{children}
			</div>
			<Footer />

			<style jsx>{`
				.body {
					max-width: var(--container-width);
					margin: 0 auto;
				}
			`}</style>
		</>
	);
};

export default Layout;
