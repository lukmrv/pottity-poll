import type { NextPage } from "next";
import { Vote, PrismaClient } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import Results from "@modules/Results/Results";

const prisma = new PrismaClient();

const PollResults = (props: { pollQuestion: string }) => {
	return <Results props={props} />;
};

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
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
		props: { pollQuestion: JSON.stringify(pollQuestion) },
	};
};

export default PollResults;
