import type { NextPage } from "next";
import { Vote, PrismaClient } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Results from "@modules/Results/Results";

const prisma = new PrismaClient();

const PollResults = (props: { pollQuestion: string }) => {
	return <Results props={props} />;
};

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
	const { question_id } = query;

	const pollQuestion = await prisma.pollQuestion.findUnique({
		where: {
			id: question_id as string,
		},
		include: {
			Votes: true,
		},
	});

	return {
		props: {
			pollQuestion: JSON.stringify(pollQuestion),
			...(await serverSideTranslations(locale as string, [
				"common",
				"results-page",
				"header",
				"footer",
				"share",
			])),
		},
	};
};

export default PollResults;
