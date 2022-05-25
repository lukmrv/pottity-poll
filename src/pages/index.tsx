import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Home from "src/modules/Home/Home";

// Pls ignore this redux setup. It's just in case and as an example
// import { useAppDispatch, useAppSelector } from "@utils/redux/reduxHooks";
// import { increment, decrement, incrementByAmount, selectExample } from "@utils/redux/exampleSlice";

interface Props {
	locale: string;
}

export async function getStaticProps({ locale }: Props) {
	return {
		props: {
			...(await serverSideTranslations(locale, [
				"common",
				"main-page",
				"header",
				"footer",
				"validations",
			])),
		},
	};
}

const Index = () => {
	// const dispatch = useAppDispatch();
	// const exampleStoreValue = useAppSelector(selectExample);

	return <Home />;
};

export default Index;
