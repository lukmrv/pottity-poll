import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

// initialte action / response when hitting API route
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		return await createPollQuestion(req, res);
	}

	return res.status(405).json({ message: "Method not allowed", success: false });
}

// post question do DB
const createPollQuestion = async (req: NextApiRequest, res: NextApiResponse) => {
	const { question, ownerToken, options, multiselect, endsAt } = JSON.parse(req.body);

	try {
		const newPollQuestion = await prisma.pollQuestion.create({
			data: {
				question: question,
				ownerToken: ownerToken,
				options: options,
				multiselect: multiselect,
				endsAt: endsAt,
			},
		});

		return res.status(200).json({ newPollQuestion, success: true });
	} catch (error) {
		console.error("Request error", error);
		res.status(500).json({ error: "Error creating question", success: false });
	}
};
