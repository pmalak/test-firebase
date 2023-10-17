import React, { FC } from "react";
import { Chat } from "@/types";
import Link from "next/link";
import { ChatRow } from "./chat-row";

type Props = {
  chats: Chat[];
};

export const Chats: FC<Props> = ({ chats }) => {


    


  return (
    <div>
      {chats.map((chat => (<ChatRow  chat={chat}/>)))}
    </div>
  );
};
