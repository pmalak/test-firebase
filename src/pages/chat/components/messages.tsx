import { currentUser } from "@/mocks";
import { Chat } from "@/types";
import { Box, Typography } from "@material-ui/core";
import { mock } from "node:test";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

type Props = {
  messages: Chat["messages"];
};

export const Messages = ({ messages }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages.length]);

  return (
    <ScrollWrapper>
      <MessageWrapper>
        {messages?.map((message) => (
          <Message $isMyMessage={message.author.id === currentUser.id} key={message.id}>
            {/* <span>{message.author.name}</span> */}

            <Typography>{message.content}</Typography>
          </Message>
        ))}
        <div ref={ref} />
      </MessageWrapper>
    </ScrollWrapper>
  );
};

const ScrollWrapper = styled.div`
  overflow: scroll;
`;

const MessageWrapper = styled.div`
  display: grid;
  align-content: end;
  grid-row-gap: 16px;
  padding: 16px;
  min-height: 100%;
`;

const Message = styled.div<{ $isMyMessage: boolean }>`
  max-width: 80%;
  border-radius: 20px;
  background-color: ${(props) => (props.$isMyMessage ? "#272a35" : "#373E4E")};
  justify-self: ${(props) => (props.$isMyMessage ? "end" : "start")};
  padding: 8px 16px;
`;
