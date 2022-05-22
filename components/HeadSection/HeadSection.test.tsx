// import { render, screen } from "@testing-library/react";
import React from "react";
import renderer from "react-test-renderer";
import HeadSection from "@components/HeadSection/HeadSection";

describe("Head Section render test", () => {
	it("renders correctly", () => {
		const tree = renderer.create(<HeadSection mainText="testing example text" />).toJSON();
		expect(tree).toMatchInlineSnapshot(`
<div
  className="flex flex-col items-center"
>
  <span
    className="text-3xl font-bold text-white"
  >
    testing example text
  </span>
</div>
`);
	});

	// // No snapshot test
	// it("renders a message", () => {
	// 	const { container, getByText } = render(<HeadSection mainText="testing example text" />);
	// 	expect(getByText("testing example text")).toBeInTheDocument();
	// });
});
