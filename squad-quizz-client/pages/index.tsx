import { useRouter } from "next/router";
import styled from "styled-components";
import { socket } from "./api/socket/socket";
import NavigationPane from "@/common/components/navigationPane";

export default function Home() {
  const router = useRouter();

  const goToLobby = () => {
    socket.emit("new_lobby", (playerId: string, lobbyId: string) => {
      localStorage.setItem("playerId", playerId);
      router.push({ pathname: "/lobby/[lobbyId]", query: { lobbyId } });
    });
  };

  return (
    <>
      <NavigationPane currentPage={"home"} router={router} />
      <NewQuizz onClick={goToLobby}>New quizz</NewQuizz>
    </>
  );
}

const Title = styled.h1`
  text-align: center;
  margin: 20px auto 0 auto;
`;

const NewQuizz = styled.div`
  padding: 10px;
  margin: 50px;
  border-radius: 5px;
  background-color: #2121ff;
  font-weight: 500;
  display: inline-block;
  :hover {
    background-color: #0000ff;
  }
`;
