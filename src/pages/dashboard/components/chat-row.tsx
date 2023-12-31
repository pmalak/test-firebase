import { Chat } from "@/types";
import { getFormatTimeOrDate, useChatMembersForHeader } from "@/utils/helpers";
import { Avatar, Typography } from "@material-ui/core";
import { Timestamp } from "firebase/firestore";
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
        <Avatar
          className="avatar"
          alt={chatMembers[0].name}
          src={chatMembers[0].avatarUrl}
          style={{
            boxShadow: "4px 4px 24px 0px rgba(0, 0, 0, 0.45)",
            height: "48px",
            width: "49px",
          }}
        />

        <Typography style={{ fontSize: "15px" }}>
          {chatMembers[0].name}
        </Typography>

        {lastMessage && (
          <>
            <Typography style={{ fontSize: "13px" }} noWrap className="message">
              {lastMessage.content}
            </Typography>

            <Typography style={{ fontSize: "13px" }}>
              {getFormatTimeOrDate(lastMessage.createdAt as Timestamp)}
            </Typography>
          </>
        )}
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

  .avatar {
    grid-row: span 2;
  }

  .message {
    grid-column: span 2;
  }
`;
