import { NextPage } from "next";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import { Messages } from "./components/messages";
import styled from "styled-components";
import { Input } from "./components/input";
import { ChatHeader } from "./components/chat-header";
import { doc, onSnapshot } from "firebase/firestore";
import { Chat } from "@/types";
import db from "@/utils/firebase";
import { useUserContext } from "@/components/user-context";

const ChatPage: NextPage = ({}) => {
  const router = useRouter();
  const { chatId } = router.query;

  const { currentUser } = useUserContext();

  const [chat, setChat] = useState<Chat | null>(null);

  useEffect(() => {
    if (currentUser?.chats.includes(chatId as string)) {
      const queryChat = doc(db, "chats", chatId as string);

      if (queryChat) {
        const unsubscribe = onSnapshot(queryChat, (querySnapshot) => {
          if (querySnapshot) {
            setChat(querySnapshot.data() as Chat);
          }
        });

        return unsubscribe;
      }
    }

    const contact = localStorage.getItem("newChatParticipant");

    setChat({
      id: new Date().toDateString(),
      messages: [],
      lastMessage: null,
      members: [contact!, currentUser?.id ?? ""],
    });
  }, [chatId, currentUser, currentUser?.chats]);

  if (chat) {
    return (
      <Wrapper>
        <ChatHeader chat={chat} />

        <Messages messages={chat?.messages ?? []} />

        <Input />
      </Wrapper>
    );
  }

  return null;
};

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

export default ChatPage;
