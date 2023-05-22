import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function SubmitTimer({
  timer,
  totalTimer,
}: {
  timer: number;
  totalTimer: number;
}) {
  return (
    <CircularProgressbar
      styles={{
        path: {
          stroke: "#0f0fa8",
          strokeLinecap: "round",
        },
        trail: {
          stroke: "#080850",
        },
        text: {
          fill: "white",
          fontSize: 35,
        },
      }}
      strokeWidth={15}
      value={timer}
      maxValue={totalTimer}
      text={timer.toString()}
    />
  );
}
