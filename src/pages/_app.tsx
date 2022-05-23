import "@styles/globals.css";
import "@styles/toastify.css";
import Error from "next/error";
import type { AppProps } from "next/app";
import Layout from "@components/Layout/Layout";
// import { store } from "@utils/redux/store";

// import { Provider } from "react-redux";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
	if (pageProps.error) {
		return <Error statusCode={pageProps.error.statusCode} title={pageProps.error.message} />;
	}
	return (
		// Pls ignore this redux setup. It's just in case and as an example
		// <Provider store={store}>
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
		// </Provider>
	);
}

export default MyApp;
