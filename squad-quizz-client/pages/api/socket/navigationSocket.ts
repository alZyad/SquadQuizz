import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket } from "socket.io-client";

type onGoToQuizzOrderType = {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  cb: (lobbyId: string, quizzId: string) => void;
};

export const onGoToQuizzOrder = ({ socket, cb }: onGoToQuizzOrderType) => {
  socket.on("goToQuizzOrder", cb);
};

type emitGoToQuizzType = {
  playerId: string | null;
  lobbyId: string | undefined;
  quizzId: string;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  cb: () => void;
};

export const emitGoToQuizz = ({
  playerId,
  lobbyId,
  quizzId,
  socket,
  cb,
}: emitGoToQuizzType) => {
  socket.emit("goToQuizz", lobbyId, quizzId, playerId, cb);
};
