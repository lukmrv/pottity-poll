import { PrismaClient } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import OptionSelect from "src/modules/OptionSelect/OptionSelect";

const prisma = new PrismaClient();

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
	const { question_id } = query;

	const pollQuestion = await prisma.pollQuestion.findUnique({
		where: {
			id: question_id as string,
		},
	});

	return {
		props: {
			pollQuestion: JSON.stringify(pollQuestion),
			...(await serverSideTranslations(locale as string, [
				"common",
				"vote-page",
				"header",
				"footer",
				"share",
				"validations",
			])),
		},
	};
};

const Poll = (props: { pollQuestion: string }) => {
	return <OptionSelect props={props} />;
};

export default Poll;
