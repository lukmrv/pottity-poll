import { PrismaClient } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import OptionSelect from "src/modules/OptionSelect/OptionSelect";

const Poll = (props: { pollQuestion: string }) => {
	return <OptionSelect props={props} />;
};

const prisma = new PrismaClient();

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
	const { question_id } = context.query;

	const pollQuestion = await prisma.pollQuestion.findUnique({
		where: {
			id: question_id as string,
		},
	});

	return {
		props: { pollQuestion: JSON.stringify(pollQuestion) },
	};
};

export default Poll;
