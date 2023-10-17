import { chatsMock } from "@/mocks";

import { NextPage } from "next";
import { useRouter } from "next/router";

import React, { useState } from "react";
import { Messages } from "./components/messages";
import styled from "styled-components";
import { Input } from "./components/input";
import { ChatHeader } from "./components/chat-header";

const Chat: NextPage = ({}) => {
  const { query } = useRouter();
  const { chatId } = query;

  const chat = chatsMock.find((chat) => chat.id === chatId);

  const [messages, setMessages] = useState(chat?.messages ?? []);

  console.log("messages", messages);

  return (
    <Wrapper>
      {/* TODO: fix */}
      <ChatHeader chatName={chat?.chatName ?? "name"} />
      <Messages messages={messages} />

      <Input setMessages={setMessages} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

export default Chat;
