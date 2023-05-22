import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { socket } from "../api/socket/socket";
import NavigationPane from "@/common/components/navigationPane";
import {
  emitGoToQuizz,
  onGoToQuizzOrder,
} from "../api/socket/navigationSocket";
import { BasicButton } from "@/common/components/basicButton";

export default function Lobby() {
  const router = useRouter<"/lobby/[lobbyId]">();
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const { lobbyId } = router.query; // TODO: why is lobbyId undefined?

  useEffect(() => {
    const playerId = localStorage.getItem("playerId");
    setPlayerId(playerId);
    setIsAdmin(!!playerId);

    socket.emit("check_admin", playerId, lobbyId, (res: boolean) => {
      setIsAdmin(res);
    });
  }, [lobbyId]);

  const goToQuizzOrderCallback = (
    lobbyId: string | undefined,
    quizzId: string
  ) => {
    const fullId = lobbyId + "-" + quizzId;

    router.push({
      pathname: "/quizz/[fullId]",
      query: { fullId },
    });
  };

  onGoToQuizzOrder({
    socket,
    cb: goToQuizzOrderCallback,
  });

  const goToQuizzCallback = (quizzId: string) => {
    const fullId = lobbyId + "-" + quizzId;
    router.push({
      pathname: "/quizz/[fullId]",
      query: { fullId },
    });
  };

  const goToQuizz = (quizzId: string) => {
    if (isAdmin) {
      emitGoToQuizz({
        playerId,
        lobbyId,
        quizzId,
        socket,
        cb: () => goToQuizzCallback(quizzId),
      });
    }
  };

  const copyLink = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL);
    setLinkCopied(true);
  };

  return (
    <>
      <NavigationPane currentPage={"lobby"} isAdmin={isAdmin} router={router} />
      <ShareButton hoverColor="blueviolet" onClick={copyLink}>
        {linkCopied ? "Copied !" : "Copy lobby link"}
      </ShareButton>
      <QuizzGrid>
        <Quizz onClick={() => goToQuizz("1")}>option1</Quizz>
        <Quizz onClick={() => goToQuizz("2")}>option2</Quizz>
        <Quizz onClick={() => goToQuizz("3")}>option3</Quizz>
        <Quizz onClick={() => goToQuizz("4")}>option4</Quizz>
      </QuizzGrid>
    </>
  );
}

const ShareButton = styled(BasicButton)`
  display: block;
  margin: 0 auto;
  font-size: 12px;
  padding: 10px;
  background-color: #6b20b0;
`;

const QuizzGrid = styled.div`
  width: 80%;
  max-width: 1200px;
  margin: 50px auto 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Quizz = styled.div`
  min-width: 200px;
  padding: 20px;
  margin: 10px;
  border: 2px solid snow;
  border-radius: 5px;
  :hover {
    background-color: #232323;
  }
`;
