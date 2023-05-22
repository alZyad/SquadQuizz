import QuestionOption from "@/common/components/questionOption";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { socket } from "../api/socket/socket";
import NavigationPane from "@/common/components/navigationPane";

type statusType = "correct" | "wrong" | "neutral";

const options = [
  { optionText: "Amine is my name", Correct: true },
  { optionText: "Zyad is my name", Correct: false },
  { optionText: "Sou is my name", Correct: false },
  { optionText: "Amal is my name", Correct: false },
];

export default function Home() {
  const router = useRouter<"/quizz/[fullId]">();
  const { fullId } = router.query;
  const [playerId, setPlayerId] = useState<String | null>(null);
  const [isAdmin, setIsAdmin] = useState(!!playerId);
  const [selectedOption, setSelectedOption] = useState<null | number>(null);
  const [submitted, setSubmitted] = useState(false);
  const [questionRevealed, setQuestionRevealed] = useState(false);
  const [optionsRevealed, setOptionsRevealed] = useState(false);

  useEffect(() => {
    setPlayerId(localStorage.getItem("playerId"));
    // socket.emit(
    //   "check_reveal",
    //   fullId,
    //   ({
    //     isQuestionRevealed,
    //     isOptionsRevealed,
    //   }: {
    //     isQuestionRevealed: boolean;
    //     isOptionsRevealed: boolean;
    //   }) => {
    //     setQuestionRevealed(isQuestionRevealed);
    //     setOptionsRevealed(isOptionsRevealed);
    //   }
    // );
  });

  const lobbyId = fullId?.slice(0, 3);
  const quizzId = fullId?.slice(4, fullId.length);

  socket.on("reveal_question_order", (quizzIdOrder) => {
    if (quizzIdOrder === quizzId) {
      setQuestionRevealed(true);
    }
  });

  socket.on("reveal_options_order", (quizzIdOrder) => {
    if (quizzIdOrder === quizzId) {
      setOptionsRevealed(true);
    }
  });

  socket.emit("check_admin", playerId, lobbyId, (res: boolean) => {
    setIsAdmin(res);
  });

  const onSubmit = () => {
    setSubmitted(true);
  };

  const revealQuestion = () => {
    isAdmin &&
      socket.emit("reveal_question", lobbyId, quizzId, playerId, () => {
        setQuestionRevealed(true);
      });
  };

  const revealOptions = () => {
    isAdmin &&
      socket.emit("reveal_options", lobbyId, quizzId, playerId, () => {
        setOptionsRevealed(true);
      });
  };

  return (
    <>
      <NavigationPane currentPage={"quizz"} isAdmin={isAdmin} router={router} />
      <Quizz>
        {questionRevealed || isAdmin ? (
          <Question>What is your name ?</Question>
        ) : (
          <Question>Question hidden</Question>
        )}
        {optionsRevealed || isAdmin ? (
          <>
            {/* TODO: extract options block to component */}
            <OptionBlock>
              {options.map((option, index) => {
                return (
                  <QuestionOption<statusType>
                    key={index}
                    optionText={option.optionText}
                    index={index}
                    selectOption={() =>
                      setSelectedOption(
                        (prevIndex) => (submitted ? prevIndex : index) // only change selection before submition
                      )
                    }
                    selected={selectedOption === index}
                    status={
                      submitted
                        ? option.Correct
                          ? "correct"
                          : selectedOption === index
                          ? "wrong"
                          : "neutral"
                        : "neutral"
                    }
                  />
                );
              })}
            </OptionBlock>
            {!isAdmin && (
              <SubmitButton
                onClick={onSubmit}
                disabled={submitted || selectedOption === null}
              >
                Submit
              </SubmitButton>
            )}
          </>
        ) : (
          <HiddenAnswers>Answers hidden</HiddenAnswers>
        )}
      </Quizz>
      {isAdmin && (
        <AdminBlock>
          <AdminButton onClick={revealQuestion} disabled={questionRevealed}>
            Reveal question
          </AdminButton>
          <AdminButton onClick={revealOptions} disabled={optionsRevealed}>
            Reveal answers
          </AdminButton>
          <AdminButton
            onClick={() => {
              revealQuestion();
              revealOptions();
            }}
            disabled={questionRevealed && optionsRevealed}
          >
            Reveal everything
          </AdminButton>
        </AdminBlock>
      )}
    </>
  );
}

const Quizz = styled.div`
  width: 60%;
  max-width: 600px;
  border: 2px solid grey;
  border-radius: 5px;
  margin: 50px auto 0 auto;
  padding: 10px;
`;

const Question = styled.div`
  padding: 10px;
  font-size: 30px;
`;

const HiddenAnswers = styled.div`
  padding: 40px;
  font-size: 20px;
  text-align: center;
`;

const OptionBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  flex-wrap: wrap;
  padding-bottom: 10px;
`;

const SubmitButton = styled.button`
  width: 100px;
  padding: 10px;
  font-size: 15px;
  background-color: ${(props) => (props.disabled ? "#414141" : "#02024b")};
  color: snow;
  border: 0px;
  border-radius: 5px;
  display: block;
  margin: auto;
  :hover {
    background-color: ${(props) => (props.disabled ? "#414141" : "#02025e")};
  }
`;

const AdminBlock = styled.div`
  display: flex;
  max-width: 1000px;
  width: 40%;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px;
  margin: auto;
`;

const AdminButton = styled.button`
  width: 100px;
  padding: 10px;
  font-size: 15px;
  background-color: ${(props) => (props.disabled ? "#414141" : "#42024b")};
  color: snow;
  border: 0px;
  border-radius: 5px;
  display: block;
  margin: auto;
  :hover {
    background-color: ${(props) => (props.disabled ? "#414141" : "#58025e")};
  }
`;
