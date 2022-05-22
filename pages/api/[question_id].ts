import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

// initialte action / response when hitting API route
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		return await addVote(req, res);
	}

	if (req.method === "GET") {
		return await getPollQuestion(req, res);
	}

	return res.status(405).json({ message: "Method not allowed", success: false });
}

// get question from DB
const getPollQuestion = async (req: NextApiRequest, res: NextApiResponse) => {
	const question_id = req.query.question_id;

	try {
		const pollQuestion = await prisma.pollQuestion.findUnique({
			where: {
				id: question_id as string,
			},
		});

		return res.status(200).json(pollQuestion);
	} catch (error) {
		console.error("Request error", error);
		res.status(500).json({ error: "Error finding question", success: false });
	}
};

// add vote to a specific question
const addVote = async (req: NextApiRequest, res: NextApiResponse) => {
	const { voterToken, choice } = JSON.parse(req.body);
	const { question_id } = req.query;

	try {
		const pollQuestion = await prisma.pollQuestion.findUnique({
			where: {
				id: question_id as string,
			},
			include: {
				Votes: true,
			},
		});

		if (pollQuestion?.Votes.map((vote) => vote.voterToken).includes(voterToken)) {
			return res.status(500).json({ error: "You already voted on this poll", success: false });
		}

		const createVote = await prisma.vote.create({
			data: {
				choice: choice,
				voterToken: voterToken,
				question: {
					connect: { id: question_id as string },
				},
			},
		});

		return res.status(200).json({ createVote, success: true });
	} catch (error) {
		console.error("Request error", error);
		res.status(500).json({ error: "Error creating question", success: false });
	}
};
