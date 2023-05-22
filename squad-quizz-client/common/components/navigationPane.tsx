import styled from "styled-components";
import { BasicButton } from "./basicButton";

export default function NavigationPane(props: {
  currentPage: string;
  isAdmin?: boolean;
  router;
}) {
  const { currentPage, isAdmin, router } = props;

  const goBack = () => {
    router.back();
  };
  return (
    <HorizontalContainer>
      <Button visible={currentPage != "home" && isAdmin} onClick={goBack}>
        Back
      </Button>
      <Title>Jeopardy !</Title>
      <Button visible>Settings</Button>
    </HorizontalContainer>
  );
}

const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: 20px auto 0 auto;
`;

const Title = styled.h1`
  text-align: center;
`;

const Button = styled(BasicButton)<{ visible: boolean }>`
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  min-width: 100px;
  border: 1px solid snow;
  border-radius: 5px;
  font-size: medium;
`;
