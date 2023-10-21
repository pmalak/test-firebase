import { useUserContext } from "@/components/user-context";
import { Avatar } from "@material-ui/core";
import styled from "styled-components";

export const DashboardHeader = () => {
  const { currentUser } = useUserContext();

  return (
    <Wrapper>
      <img src="https://crystallize.com/static/logo/crystallize-logo.svg" />

      <Avatar
        src={currentUser?.avatarUrl ?? ""}
        style={{
          height: "32px",
          width: "32px",
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 40px;
  justify-content: space-between;
  padding: 0 32px;
  margin: 8px 0px 24px;
`;
