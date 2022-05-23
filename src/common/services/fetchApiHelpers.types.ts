import { PollQuestion, Vote } from "@prisma/client";

// picking types from Prisma generated type for PollQuestion model
export interface Question
	extends Pick<
		PollQuestion,
		"ownerToken" | "question" | "ownerToken" | "endsAt" | "options" | "multiselect"
	> {}

// this interface extends picked types from generated Prisma type fo Vote
// and then adds types for choice array
export interface PollVote extends Pick<Vote, "voterToken"> {
	choice: number[];
}
