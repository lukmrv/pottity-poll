import React from "react";
import type { NextPage } from "next";

import Home from "src/modules/Home/Home";

// Pls ignore this redux setup. It's just in case and as an example
// import { useAppDispatch, useAppSelector } from "@utils/redux/reduxHooks";
// import { increment, decrement, incrementByAmount, selectExample } from "@utils/redux/exampleSlice";

const Index: NextPage = () => {
	// const dispatch = useAppDispatch();
	// const exampleStoreValue = useAppSelector(selectExample);

	return <Home />;
};

export default Index;
