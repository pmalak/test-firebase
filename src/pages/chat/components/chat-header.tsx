import React from "react";

type Props = {
  chatName: string;
};

export const ChatHeader = ({ chatName }: Props) => {
  return (
    <div>
      <h1>{chatName}</h1>
    </div>
  );
};
