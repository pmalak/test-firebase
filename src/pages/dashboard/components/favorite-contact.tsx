import { useUserContext } from "@/components/user-context";

import { Chat, User } from "@/types";
import db from "@/utils/firebase";
import { Box, Typography } from "@material-ui/core";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import router, { useRouter } from "next/router";
import styled from "styled-components";
import { ContactItem } from "./contact-item";

type Props = {
  chats: Chat[];
};

export const FavoriteContacts = ({ chats }: Props) => {
  const { push } = useRouter();
  const { allUsers, currentUser } = useUserContext();

  const contacts = [
    ...(allUsers ?? []),
    //   , ...(allUsers ?? [])
  ];

  const chastRef = collection(db, "chats");

  const createNewChatik = async (contact: User) => {
    const newChat: Omit<Chat, "id"> = {
      messages: [],
      lastMessage: null,
      members: [
        currentUser!.id,
        contact.id === currentUser?.id ? `${currentUser?.id}self` : contact.id,
      ],
      chatName: contact.name,
      avatar: contact.avatarUrl,
    };

    try {
      const docRef = await addDoc(chastRef, newChat);

      const userRer = doc(db, "users", currentUser!.id);
      await updateDoc(userRer, {
        chats: arrayUnion(docRef.id),
      });
      const counterRer = doc(db, "users", contact.id);
      await updateDoc(counterRer, {
        chats: arrayUnion(docRef.id),
      });

      router.push(`/chat/${docRef.id}`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleClick = (contact: User) => {
    const existingChat = chats.find((chat) =>
      chat.members
        .filter((memberId) => memberId !== currentUser?.id)
        .includes(contact.id)
    );

    if (!!existingChat) {
      return push(`chat/${existingChat.id}`);
    }

    createNewChatik(contact);
  };

  return (
    <div>
      <Box p={2}>
        <Typography variant="h5">Favorites</Typography>
      </Box>

      <OverflowWrapper>
        <FavoritesWrapper>
          {contacts?.map((contact) => (
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
