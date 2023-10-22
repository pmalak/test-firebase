import { useUserContext } from "@/components/user-context";
import { Avatar } from "@material-ui/core";
import Image from "next/image";
import styled from "styled-components";

export const DashboardHeader = () => {
  const { currentUser } = useUserContext();

  return (
    <Wrapper>
      <Image
        width={118}
        height={40}
        src="https://crystallize.com/static/logo/crystallize-logo.svg"
        alt="Crystallize logo"
      />

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
