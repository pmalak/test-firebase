import { Avatar, Grid, IconButton, Typography } from "@material-ui/core";
import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Link from "next/link";
import { Chat } from "@/types";
import styled from "styled-components";
type Props = {
  chat: Chat;
};

export const ChatHeader = ({ chat: { chatName, avatar } }: Props) => {
  return (
    <Wrapper>
      <Link href="/dashboard">
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
      </Link>

      <Avatar
        alt={chatName}
        src={avatar}
        style={{
          height: "36px",
          width: "36px",
          marginRight: "8px",
        }}
      />

      <Typography>{chatName}</Typography>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: start;
  align-items: center;
`;
