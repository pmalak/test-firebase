import { chatsMock } from "@/mocks";

import { NextPage } from "next";
import { useRouter } from "next/router";

import React from "react";
import { Messages } from "./components/messages";
import styled from "styled-components";
import { Input } from "./components/input";
import { ChatHeader } from "./components/chat-header";

const Chat: NextPage = ({}) => {
  const { query } = useRouter();
  const { chatId } = query;

  const chat = chatsMock.find((chat) => chat.id === chatId);

  return (
    <Wrapper>
      {/* TODO: fix */}
      <ChatHeader chatName={chat?.chatName ?? "name"} />

      <Messages messages={chat?.messages} />

      <Input />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

export default Chat;
