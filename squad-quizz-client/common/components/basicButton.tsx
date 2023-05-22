import styled from "styled-components";

export const BasicButton = styled.button<{ hoverColor?: string }>`
  // FIXME: status is of type statusType but it is only accessible from component
  padding: 15px;
  background-color: black;
  border-radius: 5px;
  border: 0px;
  color: snow;
  :hover {
    background-color: ${(props) => props.hoverColor ?? "#5b5b5b"};
  }
`;
