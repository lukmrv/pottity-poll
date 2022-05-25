import React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm, useFieldArray } from "react-hook-form";
import classNames from "classnames";
import { useTranslation } from "next-i18next";

import TextInput from "@components/TextInput/TextInput";
import Button from "@components/Button/Button";
import Toggle from "@components/Toggle/Toggle";
import HeadSection from "@components/HeadSection/HeadSection";
import Spinner from "@components/Spinner/Spinner";

import notify from "@utils/notify";
import * as API from "@services/fetchApiHelpers";
import generateToken from "@utils/generateToken";

import { Question } from "@services/fetchApiHelpers.types";

const Home = () => {
	const { t } = useTranslation(["main-page", "validations"]);
	const router = useRouter();

	const [loading, setLoading] = useState<boolean>(false);
	const [isOptionsError, setIsOptionsError] = useState<boolean>(false);

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		defaultValues: {
			pollTopic: "",
			options: [{ value: "" }, { value: "" }],
		},
		reValidateMode: "onChange",
	});
	const { fields, append, remove } = useFieldArray({
		control,
		name: "options",
	});

	const allFieldsValues = watch();

	const [pollState, setPollState] = useState<Partial<Question>>({
		ownerToken: "",
		endsAt: null,
		multiselect: false,
	});

	useEffect(() => {
		if (typeof window !== "undefined") {
			if (window.localStorage.getItem("ownerToken")) {
				setPollState((currentPollState) => ({
					...currentPollState,
					ownerToken: window.localStorage.getItem("ownerToken") as string,
				}));
			}

			window.localStorage.setItem("ownerToken", generateToken());

			setPollState((currentPollState) => ({
				...currentPollState,
				ownerToken: window.localStorage.getItem("ownerToken") as string,
			}));
		}
	}, []);

	// creates refined version of options (ready to submit)
	const filteredNonEmptyOptions = (options: { value: string }[]) => {
		let hash: { [x: string]: string } = {};
		options.forEach((fieldArray: { value: string }, idx: number) => {
			if (fieldArray.value) {
				hash = { ...hash, [Object.keys(hash).length + 1]: fieldArray.value };
			}
		});
		return hash;
	};

	useEffect(() => {
		setIsOptionsError(
			Boolean(errors?.options) &&
				Object.keys(filteredNonEmptyOptions(allFieldsValues.options)).length <= 2
		);
	}, [allFieldsValues.options, errors?.options]);

	const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) =>
		setPollState((currentQuestionState) => ({
			...currentQuestionState,
			multiselect: e.target.checked,
		}));

	const handleCreatePollQuestion = (data: any) => {
		const apiPreparedPoll = Object.assign(
			pollState,
			{ question: data.pollTopic },
			{ options: filteredNonEmptyOptions(data.options) }
		);

		setLoading(true);

		API.createQuestion(apiPreparedPoll as Question)
			.then((response) => {
				if (response?.success) {
					router.push(`/poll/${response.newPollQuestion.id}`);
				} else {
					setLoading(false);
					notify("error", response.error, "top-center");
				}
			})
			.catch((error) => {
				setLoading(false);
				notify("error", error.message, "top-center");
			});
	};

	return (
		<>
			<Spinner enabled={loading} />

			<div className="flex flex-col items-center gap-12">
				<HeadSection
					mainText={t("main-page:title.main")}
					subText={t("main-page:title.sub")}
				/>

				<main className="container p-10 rounded-md mx-auto max-w-3xl border-t-4 bg-slate-600 border-indigo-500">
					<div className="flex flex-col items-start gap-2">
						<label className="font-bold text-lg text-white" htmlFor="question-input">
							{t("main-page:topic.header")}
						</label>

						<div className="w-full relative">
							{errors?.pollTopic && (
								<p className="absolute right-0 -top-7 text-red-400 text-xs sm:text-base sm:-top-8">
									{errors?.pollTopic?.message}
								</p>
							)}

							{/* <TextInput
								name="Question"
								type="text"
								placeholder="Write what you'd like to poll about"
								id="question-input"
								value={pollState.question}
								onChange={handleTopicChange}
							/> */}
							<input
								className={classNames(
									"w-full px-3 py-2 rounded-md border-none focus:outline focus:outline-2 text-slate-800 bg-slate-400 placeholder-slate-500 focus:outline-indigo-800",
									{ "focus:outline-2 focus:outline-red-400": errors?.pollTopic }
								)}
								placeholder={t("main-page:topic.placeholder")}
								{...register("pollTopic", {
									required: t("validations:validation-main-page.title"),
								})}
							/>
						</div>

						<span className="font-bold text-lg text-white pt-4">
							{t("main-page:options.header")}
						</span>

						<div className="relative flex flex-col w-full gap-2">
							{
								// validation text for options provided not from React Hook Form, but as a "normally" defined text
								isOptionsError && (
									<p className="absolute right-0 -top-7 text-red-400 text-xs sm:text-base sm:-top-8">
										{t("validations:validation-main-page.options")}
									</p>
								)
							}

							{/* React hook form magic */}
							{fields.map((item, index, arr) => (
								<div key={item.id} className="relative flex flex-col w-full gap-2">
									<input
										className={classNames(
											"w-full px-3 py-2 rounded-md border-none focus:outline focus:outline-2 text-slate-800 bg-slate-400 placeholder-slate-500 focus:outline-indigo-800",
											{
												"focus:outline-2 focus:outline-red-400":
													isOptionsError,
											}
										)}
										placeholder={`${t("main-page:options.placeholder")} ${
											index + 1
										}`}
										{...register(
											`options[${index}].value` as "options.0.value",
											{
												// setting required based on the number of provided options. If < 2 - set to true, else false
												required:
													Object.keys(
														filteredNonEmptyOptions(
															allFieldsValues.options
														)
													).length < 2,
											}
										)}
									/>

									{arr.length > 2 && (
										<Button
											buttonInside
											color="color-theme"
											onClick={() => remove(index)}
										>
											&#10005;
										</Button>
									)}
								</div>
							))}
						</div>

						<Button
							color="color-theme"
							onClick={() => {
								append({ value: "" });
							}}
						>
							<span className="font-bold rotate-45">&#10005;</span>
						</Button>

						{/* separator line */}
						<div className="w-full">
							<div className="my-4 border-none h-0.5 w-full bg-slate-500" />
						</div>

						<div className="grid gap-2 sm:gap-8 sm:grid-cols-[1fr_2px_1fr] items-start w-full">
							<Toggle
								type="checkbox"
								id="multiselect"
								labelText={t("main-page:controls.multiselect")}
								onChange={handleToggle}
							/>

							{/* <div className="space-y-2">
								<label className="font-bold text-white" htmlFor="ends-at">
								Ends at (optional)
								</label>
								<input
								type="datetime-local"
								name=""
								id="ends-at"
								/>
								</div> 
							*/}
						</div>

						{/* separator line */}
						<div className="w-full">
							<div className="my-4 border-none h-0.5 w-full bg-slate-500" />
						</div>

						<Button color="color-main" onClick={handleSubmit(handleCreatePollQuestion)}>
							{t("main-page:controls.create")}
						</Button>
					</div>
				</main>
			</div>
		</>
	);
};

export default Home;
