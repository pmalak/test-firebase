import React from "react";
import { Chat } from "@/types";
import { ChatRow } from "./chat-row";

type Props = {
  chats: Chat[];
};

export const Chats = ({ chats }: Props) => {
  return (
    <div>
      {chats.map((chat) => (
        <ChatRow chat={chat} key={chat.id} />
      ))}
    </div>
  );
};
