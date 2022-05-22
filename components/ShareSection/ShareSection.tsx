import type { NextPage } from "next";
import { useState } from "react";
import CopyLink from "@components/CopyLink/CopyLink";
import { FaShareAlt } from "react-icons/fa";

const ShareSection: NextPage = () => {
	const [currentLink, setCurrentLink] = useState<string>(() => {
		if (typeof window !== "undefined") {
			// exclude results page (so on the results page the poll itself is shared)
			const currentPollLink = window.location.href.split("/results")[0];

			return currentPollLink;
		}

		return "";
	});

	return (
		<>
			<div className="flex w-full flex-col items-center bg-slate-800">
				<main className="container p-10 rounded-md mx-auto max-w-3xl bg-slate-600 border-t-4 border-slate-500">
					<div className="flex flex-col items-start gap-2">
						<span className="pb-4 gap-4 flex items-center font-bold text-xl text-white">
							<FaShareAlt /> Share
						</span>

						{/* <div className="text-1xl font-medium text-slate-500">
							<span>Poll created at:</span>
							<span>{pollQuestionState?.createdAt && pollQuestionState?.createdAt.toString()}</span>
						</div> */}

						<CopyLink value={currentLink} />

						{/* separator line */}
						<div className="w-full">
							<div className="mt-6 mb-0 border-none h-0.5 w-full bg-slate-500" />
						</div>
					</div>
				</main>
			</div>
		</>
	);
};

export default ShareSection;
