import { Avatar, IconButton, Typography } from "@material-ui/core";
import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Link from "next/link";
import { Chat } from "@/types";
import styled from "styled-components";
import { useChatMembersForHeader } from "@/utils/helpers";
type Props = {
  chat: Chat;
};

export const ChatHeader = ({ chat: { chatName, members } }: Props) => {
  const chatMembers = useChatMembersForHeader(members);

  return (
    <Wrapper>
      <Link href="/dashboard">
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
      </Link>

      <Avatar
        alt={chatName}
        src={chatMembers[0]?.avatarUrl ?? ""}
        style={{
          height: "36px",
          width: "36px",
          marginRight: "8px",
        }}
      />

      <Typography>{chatMembers[0]?.name}</Typography>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: start;
  align-items: center;
`;
