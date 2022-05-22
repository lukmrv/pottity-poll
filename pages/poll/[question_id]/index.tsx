import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { PollQuestion, PrismaClient } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

import copyToClipboard from "@utils/copyToClipboard";

import Button from "@components/Button/Button";
import Checkbox from "@components/Checkbox/Checkbox";
import StyledLink from "@components/StyledLink/StyledLink";
import RadioButton from "@components/RadioButton/RadioButton";
import Modal from "@components/Modal/Modal";
import HeadSection from "@components/HeadSection/HeadSection";
import Spinner from "@components/Spinner/Spinner";
import ShareSection from "@components/ShareSection/ShareSection";

import notify from "utils/notify";
import * as API from "@services/fetchApiHelpers";
import generateToken from "@utils/generateToken";

import { PollVote } from "@services/fetchApiHelpers.types";

import { optionsSchema } from "@validations/validationSchema";

// this interface extends picked types from generated Prisma type fo pollQuestion
// and then adds types for options object
interface PollQuestionType
	extends Pick<PollQuestion, "id" | "multiselect" | "endsAt" | "question"> {
	options: { [x: string]: string };
	createdAt: Pick<PollQuestion, "createdAt">;
}

const QuestionId: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const { pollQuestion } = props;

	const router = useRouter();

	const [loading, setLoading] = useState(false);

	const [isButtonDisabled, setIsButtonDisabled] = useState(false);

	const [showModal, setShowModal] = useState<boolean>(false);

	const [pollQuestionState, setPollQuestionState] = useState<PollQuestionType>(() =>
		JSON.parse(pollQuestion)
	);

	const [currentLink, setCurrentLink] = useState<string>(() => {
		if (typeof window !== "undefined") {
			return window.location.href;
		}

		return "";
	});

	const [pollVote, setPollVote] = useState<PollVote>({
		choice: [],
		voterToken: "",
	});

	useEffect(() => {
		if (typeof window !== "undefined") {
			if (window.localStorage.getItem("voterToken")) {
				return setPollVote((currentVoteState) => ({
					...currentVoteState,
					voterToken: window.localStorage.getItem("voterToken") as string,
				}));
			}

			window.localStorage.setItem("voterToken", generateToken());
			return setPollVote((currentVoteState) => ({
				...currentVoteState,
				voterToken: window.localStorage.getItem("voterToken") as string,
			}));
		}

		if (!pollQuestionState.id) {
			notify("error", "Could not find poll question", "top-right");
		}
	}, [setPollVote, pollQuestionState]);

	// this function takes clicked answer option and it's event and sets options in the local state on passed input change
	const selectOptionHandler = (option: string, e: React.ChangeEvent<HTMLInputElement>) => {
		const optionNumber = parseInt(option);

		const removeItemOnce = (arr: number[], value: number) => {
			const index = arr.indexOf(value);
			if (index > -1) {
				arr.splice(index, 1);
			}
			return arr;
		};

		// case for unchecking the option
		if (!e.target.checked) {
			return setPollVote((currentQuestionState) => {
				if (currentQuestionState.choice.includes(optionNumber)) {
					currentQuestionState = {
						...currentQuestionState,
						choice: removeItemOnce(currentQuestionState.choice as number[], optionNumber),
					};
				}
				return currentQuestionState;
			});
		}

		// base case for option check
		return setPollVote((currentQuestionState) => {
			if (!currentQuestionState.choice.includes(optionNumber)) {
				// guard case for radio button (no multi-select)
				if (!pollQuestionState.multiselect) {
					currentQuestionState = {
						...currentQuestionState,
						choice: [optionNumber],
					};

					return currentQuestionState;
				}

				currentQuestionState = {
					...currentQuestionState,
					choice: [...(currentQuestionState.choice as number[]), optionNumber],
				};
			}
			return currentQuestionState;
		});
	};

	const handleSubmitVote = async () => {
		// returns false if the fields are valid
		const validationError = await optionsSchema
			.validate(pollVote.choice)
			.then(() => false)
			.catch((err) => err.message);

		// preliminary validation
		if (validationError) {
			return notify("warning", validationError, "top-center");
		}

		setLoading(true);

		API.createVote(router.query.question_id as string, pollVote)
			.then((response) => {
				if (response?.success) {
					setShowModal(true);
					setLoading(false);
				} else {
					notify("error", response.error, "top-center");
					setLoading(false);
					setIsButtonDisabled(true);
				}
			})
			.catch((error) => {
				notify("error", error.message, "top-center");
				setLoading(false);
				setIsButtonDisabled(true);
			});
	};

	return (
		<>
			<Spinner enabled={loading} />

			<Modal title="Vote succesfull!" showModal={showModal} onClose={() => setShowModal(false)}>
				<div className="pb-6">
					<div className="flex justify-center text-slate-400">Thanks for the vote!</div>
					<div className="flex justify-center text-center text-slate-400">
						View the results or share this poll with others!
					</div>
				</div>
				<div className="grid grid-cols-2 gap-2">
					<Button
						color="color-main"
						onClick={() => {
							router.push(`/poll/${pollQuestionState?.id}/results`);
						}}
					>
						Show results
					</Button>
					<Button color="color-theme" onClick={() => copyToClipboard(currentLink)}>
						Copy link
					</Button>
				</div>
			</Modal>

			<div className="flex flex-col items-center gap-12">
				<HeadSection
					mainText="Vote!"
					subText={`Select one ${
						pollQuestionState?.multiselect ? "or more options" : "option"
					} in the below
					poll form`}
				/>

				<main className="container p-10 rounded-md mx-auto max-w-3xl bg-slate-600 border-t-4 border-indigo-500">
					<div className="flex flex-col items-start gap-2">
						{!pollQuestion ? (
							<span className="pb-4 font-bold text-xl text-white">
								Coud not find such poll question
							</span>
						) : (
							<span className="pb-4 font-bold text-xl text-white">
								{pollQuestionState?.question}
							</span>
						)}

						{pollQuestionState !== null &&
							Object.keys(pollQuestionState?.options).map((option: string, idx) =>
								pollQuestionState?.multiselect ? (
									<Checkbox
										name="name-for-radio"
										key={option[0]}
										labelText={pollQuestionState?.options[option]}
										id={pollQuestionState?.options[option]}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											selectOptionHandler(option, e)
										}
									/>
								) : (
									<RadioButton
										name="name-for-radio"
										key={option[0]}
										labelText={pollQuestionState.options[option]}
										id={`${pollQuestionState.options[option]}${idx}`}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											selectOptionHandler(option, e)
										}
									/>
								)
							)}

						{/* separator line */}
						<div className="w-full">
							<div className="my-4 border-none h-0.5 w-full bg-slate-500" />
						</div>

						<div className="text-1xl font-medium text-slate-500">
							<span>Poll created at:</span>
							<span>{pollQuestionState?.createdAt && pollQuestionState?.createdAt.toString()}</span>
						</div>

						{pollQuestionState !== null && pollQuestionState.endsAt && (
							<div className="text-1xl font-medium text-slate-500">
								<span>Poll ends at:</span>
								<span>{pollQuestionState?.endsAt.toString()}</span>
							</div>
						)}

						{/* separator line */}
						<div className="w-full">
							<div className="my-4 border-none h-0.5 w-full bg-slate-500" />
						</div>

						{pollQuestion ? (
							<div className="grid w-full gap-2 sm:flex">
								<Button color="color-main" disabled={isButtonDisabled} onClick={handleSubmitVote}>
									Submit vote
								</Button>

								<StyledLink color="color-accent" to={`/poll/${pollQuestionState?.id}/results`}>
									Show poll results
								</StyledLink>

								<StyledLink color="color-theme" to="/">
									Go to main page
								</StyledLink>
							</div>
						) : (
							<StyledLink color="color-theme" to="/">
								Go to main page
							</StyledLink>
						)}
					</div>
				</main>

				<ShareSection />
			</div>
		</>
	);
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

export default QuestionId;
