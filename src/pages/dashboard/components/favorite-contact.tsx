import { useUserContext } from "@/components/user-context";

import { Chat, User } from "@/types";

import { Typography } from "@material-ui/core";

import { useRouter } from "next/router";
import styled from "styled-components";
import { ContactItem } from "./contact-item";
import { v4 as uuidv4 } from "uuid";
import { useCallback } from "react";

type Props = {
  chats: Chat[];
};

export const FavoriteContacts = ({ chats }: Props) => {
  const { push } = useRouter();

  const { allUsers, currentUser } = useUserContext();

  const handleClick = useCallback(
    (contact: User) => {
      const existingChat = chats.find((chat) =>
        chat.members.includes(contact.id)
      );

      if (contact.id === currentUser?.id) {
        console.log("self-chat not implemented");
        return;
      }

      if (!!existingChat) {
        return push(`chat/${existingChat.id}`);
      }

      push(`chat/${uuidv4()}`);
      localStorage.setItem("newChatParticipant", contact.id);
    },
    [chats, currentUser?.id, push]
  );

  return (
    <div>
      <Typography variant="h5" style={{ padding: "16px" }}>
        Favorite contacts
      </Typography>

      <OverflowWrapper>
        <FavoritesWrapper>
          {allUsers?.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              handleClick={handleClick}
            />
          ))}
        </FavoritesWrapper>
      </OverflowWrapper>
    </div>
  );
};

const FavoritesWrapper = styled.div`
  padding: 0 16px 32px;
  min-width: 0;
  overflow-x: auto;

  display: grid;
  grid-auto-flow: column;

  grid-template-columns: repeat(auto-fill, minmax(95px, 1fr));
  grid-template-rows: 140px;

  grid-column-gap: 16px;
`;

const OverflowWrapper = styled.div`
  width: 100%;
  overflow-x: scroll;
`;
