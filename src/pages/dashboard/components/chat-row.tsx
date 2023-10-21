import { Chat } from "@/types";
import { useChatMembersForHeader } from "@/utils/helpers";
import { Avatar, Box, Typography } from "@material-ui/core";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

type Props = {
  chat: Chat;
};

export const ChatRow = ({ chat: { id, lastMessage, members } }: Props) => {
  const chatMembers = useChatMembersForHeader(members);

  return (
    <Link href={`/chat/${id}`}>
      <RowWrapper>
        <Box height="44px" className="avatarWrapper">
          <Avatar
            alt={chatMembers[0].name}
            src={chatMembers[0].avatarUrl}
            style={{
              boxShadow: "4px 4px 24px 0px rgba(0, 0, 0, 0.45)",
              height: "48px",
              width: "49px",
            }}
          />
        </Box>
        <Typography style={{ fontSize: "15px" }}>
          {chatMembers[0].name}
        </Typography>
        <Typography style={{ fontSize: "13px" }} noWrap className="message">
          {lastMessage?.content}
        </Typography>

        {/* <Typography style={{ fontSize: "13px" }} >
          {lastMessage?.createdAt?.toLocaleDateString()}
        </Typography> */}
      </RowWrapper>
    </Link>
  );
};

const RowWrapper = styled.div`
  padding: 16px;
  display: grid;

  grid-template-rows: 1fr 1fr;
  grid-template-columns: auto 1fr auto;
  grid-auto-flow: column;
  gap: 5px 16px;
  cursor: pointer;

  &:hover {
    background-color: #1d212c;
    transition: 0.5s;
  }

  .avatarWrapper {
    grid-row: span 2;
  }

  .message {
    grid-column: span 2;
  }
`;
