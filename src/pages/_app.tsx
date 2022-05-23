import "@styles/globals.css";
import "@styles/toastify.css";
import Error from "next/error";
import type { AppProps } from "next/app";
import Layout from "@components/Layout/Layout";

import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pls ignore this redux setup. It's just in case and as an example
// import { useAppDispatch, useAppSelector } from "@utils/redux/reduxHooks";
// import {
// setExample
// } from "@utils/redux/exampleSlice";

function MyApp({ Component, pageProps }: AppProps) {
	// const dispatch = useAppDispatch();
	// const exampleStore = useAppSelector(selectExample);

	if (pageProps.error) {
		return <Error statusCode={pageProps.error.statusCode} title={pageProps.error.message} />;
	}
	return (
		<Layout>
			<Component {...pageProps} />
			<ToastContainer
				position="top-center"
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable
				pauseOnHover
				transition={Flip}
			/>
			<div id="modal" />
			<div id="spinner" />
		</Layout>
	);
}

export default MyApp;
