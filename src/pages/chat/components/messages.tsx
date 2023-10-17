import { Chat } from "@/types";
import { Box } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

type Props = {
  messages?: Chat["messages"];
};

export const Messages = ({ messages }: Props) => {
  return (
    <MessageWrapper>
      {messages?.map((message) => (
        <div>
          <Message>
            <span>{message.author.name}</span>

            <span>{message.content}</span>
          </Message>
        </div>
      ))}
    </MessageWrapper>
  );
};

const MessageWrapper = styled.div`
  display: grid;
  align-content: end;
  grid-row-gap: 16px;
`;

const Message = styled.div<{ isMyMessage: boolean }>`
  max-width: 80%;
  border-radius: 20px;
  background: #272a35;
  justify-self: ${props => props.isMyMessage ? "start" : "end"}
  padding: 8px;
`;
