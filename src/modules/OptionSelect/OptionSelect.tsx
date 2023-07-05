import { useState, useEffect } from "react";
import { PollQuestion, PrismaClient } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";

import copyToClipboard from "@utils/copyToClipboard";

import Button from "@components/Button/Button";
import Checkbox from "@components/Checkbox/Checkbox";
import StyledLink from "@components/StyledLink/StyledLink";
import RadioButton from "@components/RadioButton/RadioButton";
import Modal from "@components/Modal/Modal";
import HeadSection from "@components/HeadSection/HeadSection";
import Spinner from "@components/Spinner/Spinner";
import ShareSection from "@components/ShareSection/ShareSection";

import notify from "@utils/notify";
import * as API from "@services/fetchApiHelpers";
import generateToken from "@utils/generateToken";

import { PollVote } from "@services/fetchApiHelpers.types";

// this interface extends picked types from generated Prisma type fo pollQuestion
// and then adds types for options object
interface PollQuestionType
  extends Pick<PollQuestion, "id" | "multiselect" | "endsAt" | "question"> {
  options: { [x: string]: string };
  createdAt: Pick<PollQuestion, "createdAt">;
}

interface OptionSelect {
  props: { pollQuestion: string };
}

const OptionSelect = ({ props }: OptionSelect) => {
  const { t } = useTranslation(["vote-page", "validations"]);

  const { pollQuestion } = props;

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
  });

  const [pollQuestionState, setPollQuestionState] = useState<PollQuestionType>(
    () => JSON.parse(pollQuestion)
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
  const selectOptionHandler = (
    option: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
            choice: removeItemOnce(
              currentQuestionState.choice as number[],
              optionNumber
            ),
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

  const handleSubmitVote = () => {
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

  const isValidationError =
    !pollVote.choice.length &&
    (errors?.choiceCheckbox?.message || errors?.choiceRadioButton?.message);

  return (
    <>
      <Spinner enabled={loading} />

      <Modal
        title={t("vote-page:modal.title")}
        showModal={showModal}
        onClose={() => setShowModal(false)}
      >
        <div className="pb-6">
          <div className="flex justify-center text-slate-400">
            {t("vote-page:modal.thankyou")}
          </div>
          <div className="flex justify-center text-center text-slate-400">
            {t("vote-page:modal.info")}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            color="color-main"
            onClick={() => {
              router.push(`/poll/${pollQuestionState?.id}/results`);
            }}
          >
            {t("vote-page:modal.control.results")}
          </Button>
          <Button
            color="color-theme"
            onClick={() => copyToClipboard(currentLink)}
          >
            {t("vote-page:modal.control.copy")}
          </Button>
        </div>
      </Modal>

      <div className="flex flex-col items-center gap-12">
        <HeadSection
          mainText={t("vote-page:title.main")}
          subText={t("vote-page:title.sub")}
        />

        <main className="container p-10 rounded-md mx-auto max-w-3xl bg-slate-600 border-t-4 border-indigo-500">
          <div className="flex flex-col items-start gap-2 relative">
            {!pollQuestion ? (
              <span className="pb-4 font-bold text-xl text-white">
                {t("vote-page:no-such-question")}
              </span>
            ) : (
              <span className="pb-4 font-bold text-xl text-white">
                {pollQuestionState?.question}
              </span>
            )}

            {isValidationError && (
              <p className="absolute right-100 top-9 text-red-400 text-xs sm:right-0 sm:text-base sm:top-2">
                {errors?.choiceCheckbox?.message ||
                  errors?.choiceRadioButton?.message}
              </p>
            )}

            {pollQuestionState !== null &&
              Object.keys(pollQuestionState?.options).map(
                (option: string, idx) =>
                  pollQuestionState?.multiselect ? (
                    <Checkbox
                      passedref={register("choiceCheckbox", {
                        // no error when at least one checkbox of "choiceCheckbox" name is chosen'
                        required:
                          pollVote?.choice?.length === 0 &&
                          t("validations:validation-vote-page.select"),
                      })}
                      name="name-for-radio"
                      key={option[0]}
                      labelText={pollQuestionState?.options[option]}
                      id={pollQuestionState?.options[option]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        selectOptionHandler(option, e);
                      }}
                    />
                  ) : (
                    <RadioButton
                      passedref={register("choiceRadioButton", {
                        // no error when at least one checkbox of "choiceCheckbox" name is chosen'
                        required:
                          pollVote?.choice?.length === 0 &&
                          t("validations:validation-vote-page.select_one"),
                      })}
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
              <span>{t("vote-page:controls.created")}</span>
              <span>
                {pollQuestionState?.createdAt &&
                  pollQuestionState?.createdAt.toString()}
              </span>
            </div>

            {pollQuestionState !== null && pollQuestionState.endsAt && (
              <div className="text-1xl font-medium text-slate-500">
                <span>{t("vote-page:controls.ends")}</span>
                <span>{pollQuestionState?.endsAt.toString()}</span>
              </div>
            )}

            {/* separator line */}
            <div className="w-full">
              <div className="my-4 border-none h-0.5 w-full bg-slate-500" />
            </div>

            {pollQuestion ? (
              <div className="grid w-full gap-2 sm:flex">
                <Button
                  color="color-main"
                  disabled={isButtonDisabled}
                  onClick={handleSubmit(handleSubmitVote)}
                >
                  {t("vote-page:controls.submit")}
                </Button>

                <StyledLink
                  color="color-accent"
                  to={`/poll/${pollQuestionState?.id}/results`}
                >
                  {t("vote-page:controls.results")}
                </StyledLink>

                <StyledLink color="color-theme" to="/">
                  {t("vote-page:controls.main")}
                </StyledLink>
              </div>
            ) : (
              <StyledLink color="color-theme" to="/">
                {t("vote-page:controls.main")}
              </StyledLink>
            )}
          </div>
        </main>

        <ShareSection />
      </div>
    </>
  );
};

export default OptionSelect;
