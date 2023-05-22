import styled from "styled-components";
import { getColor } from "../utils/colors";
import { BasicButton } from "./basicButton";

export default function questionOption<statusType>(props: {
  optionText: string;
  index: number;
  selectOption: () => void;
  selected: boolean;
  status: statusType;
}) {
  const optionLetter = String.fromCharCode(65 + props.index);
  return (
    <Option
      onClick={props.selectOption}
      selected={props.selected}
      status={props.status}
    >
      {optionLetter}) {props.optionText}
    </Option>
  );
}

const Option = styled(BasicButton)<{ selected: boolean; status: any }>`
  // FIXME: status is of type statusType but it is only accessible from component
  width: 150px;
  height: auto;
  margin: 5px;
  flex: 40%;
  font-size: 20px;
  background-color: ${(props) =>
    getColor({
      status: props.status,
      reference: {
        correct: "#008000",
        wrong: "#990303",
        neutral: props.selected ? "#5b5b5b" : "#000000",
      },
    })};
  text-align: left;
  :hover {
    background-color: ${(props) =>
      getColor({
        status: props.status,
        reference: {
          correct: "#008000",
          wrong: "#990303",
          neutral: props.selected ? "#5b5b5b" : "#161616",
        },
      })};
  }
`;
