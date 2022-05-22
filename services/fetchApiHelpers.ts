import { Question, PollVote } from "@services/fetchApiHelpers.types";

export const createQuestion = async (question: Question) => {
	const response = await fetch(`/api/create_question`, {
		method: "POST",
		body: JSON.stringify(question),
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	return await response.json();
};

export const getQuestion = async (qestionId: string) => {
	const response = await fetch(`/api/${qestionId}`, {
		method: "GET",
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	return await response.json();
};

export const createVote = async (qestionId: string, pollVote: PollVote) => {
	const response = await fetch(`/api/${qestionId}`, {
		method: "POST",
		body: JSON.stringify(pollVote),
	});

	if (!response.ok) {
		const responseMessage = await response.json();
		return responseMessage;
	}

	return await response.json();
};
