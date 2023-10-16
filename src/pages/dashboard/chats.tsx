import React, { FC } from "react";
import { Chat } from "@/types";

type Props = {
  chats: Chat[];
};

export const Chats: FC<Props> = ({ chats }) => {
  return (
    <div>
      {chats.map(({ chatName, lastMessage }) => (
        <div key={chatName}>
          <span>{chatName}</span>{" "}
          <span>{lastMessage.createdAt.toDateString()}</span>
        </div>
      ))}
    </div>
  );
};
