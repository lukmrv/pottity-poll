import { useState, useEffect } from "react";

import StyledLink from "@components/StyledLink/StyledLink";
import HorizontalBarChart from "@components/HorizontalBarChart/HorizontalBarChart";
import HeadSection from "@components/HeadSection/HeadSection";
import ShareSection from "@components/ShareSection/ShareSection";

import { PollVote } from "@services/fetchApiHelpers.types";

type ResultsType = {
	[x: string]: number;
};

const Results = ({ props }: { props: { pollQuestion: string } }) => {
	const { pollQuestion } = props;

	const [pollQuestionState, setPollQuestionState] = useState(() => JSON.parse(pollQuestion));

	const [pollResultsArray, setPollResultsArray] = useState<number[]>(() =>
		pollQuestionState?.Votes?.map((vote: PollVote) => vote.choice).flat()
	);
	const [pollOptionsArray, setPollOptionsArray] = useState<string[]>(
		() =>
			pollQuestionState?.options &&
			Object.keys(pollQuestionState?.options).map(
				(option) => pollQuestionState.options[option]
			)
	);

	const [results, setResults] = useState<ResultsType>(() => {
		const resultsHash: ResultsType = {};
		// here we assign results array to options array into one object.
		// relusts array contains voted option numbes (each number represetns option)
		// Options count starts from 1, not from 0.
		for (let i = 0; i < pollOptionsArray?.length; i++) {
			if (!resultsHash.hasOwnProperty(pollOptionsArray[i])) {
				resultsHash[pollOptionsArray[i]] = 0;
			}

			// options: [Option 1, Option 2, Option 3]
			// results: [1, 1, 2, 3, 3, 3, 3, 3]
			/* output: {
				Option 1: 2,
				Option 2: 1,
				Option 3: 5
			} */
			for (let j = 0; j < pollResultsArray.length; j++) {
				if (pollResultsArray[j] - 1 === i) {
					resultsHash[pollOptionsArray[i]] += 1;
				}
			}
		}

		return resultsHash;
	});

	return (
		<div>
			<div className="flex flex-col items-center gap-12">
				<HeadSection mainText="Poll results" />

				<main className="container p-10 rounded-md mx-auto max-w-3xl bg-slate-600 border-t-4 border-indigo-500">
					<div className="flex flex-col items-start gap-2">
						<span className="pb-4 font-bold text-xl text-white">
							{pollQuestionState?.question}
						</span>

						<HorizontalBarChart collectedResults={results} />

						{/* separator line */}
						<div className="w-full">
							<div className="my-4 border-none h-0.5 w-full bg-slate-500" />
						</div>

						<div className="flex gap-2 mt-4">
							<StyledLink color="color-theme" to={`/poll/${pollQuestionState?.id}`}>
								Go back to poll
							</StyledLink>
							<StyledLink color="color-main" to="/">
								Create new poll!
							</StyledLink>
						</div>
					</div>
				</main>
				<ShareSection />
			</div>
		</div>
	);
};

export default Results;
