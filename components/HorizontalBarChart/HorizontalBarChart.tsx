import { useState } from "react";

type Props = {
	collectedResults: { [x: string]: number };
};

const HorizontalBarChart = ({ collectedResults }: Props) => {
	const [totalResults, setTotalResults] = useState(() =>
		Object.keys(collectedResults).reduce((acc, option: string) => {
			acc += collectedResults[option];
			return acc;
		}, 0)
	);

	return (
		<div className="w-full space-y-2">
			{Object.keys(collectedResults)
				.sort((a, b) => collectedResults[b] - collectedResults[a])
				.map((option, idx) => {
					const percent = Math.floor((collectedResults[option] / totalResults) * 100);
					const color = Math.floor(360 / (totalResults / collectedResults[option]));

					const styles = {
						"--colorOne": `#be123c80`,
						"--colorTwo": "#312e81",
						// "--color": `hsl(${color}, 100%, 25%)`,
						"--percent": `${percent}%`,
					} as React.CSSProperties;

					return (
						<div key={idx}>
							<label className="flex justify-between text-white" htmlFor={option.toLowerCase()}>
								<span>{option}</span>
								<span>
									{percent}% ({collectedResults[option]}{" "}
									{collectedResults[option] === 1 ? "vote" : "votes"})
								</span>
							</label>
							<div id={option.toLowerCase()} className="gradient rounded h-4" style={styles}></div>
						</div>
					);
				})}

			<div className="pb-2 text-white">Total votes: {totalResults}</div>
		</div>
	);
};

export default HorizontalBarChart;
