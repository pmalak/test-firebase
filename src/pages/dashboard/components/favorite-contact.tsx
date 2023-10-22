import { useUserContext } from "@/components/user-context";

import { Chat, User } from "@/types";
import db from "@/utils/firebase";
import { Typography } from "@material-ui/core";
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

  const chastRef = collection(db, "chats");

  const createNewChat = async (contact: User) => {
    const newChat: Omit<Chat, "id"> = {
      messages: [],
      lastMessage: null,
      members: [currentUser!.id, contact.id],
      chatName: contact.name,
      avatar: contact.avatarUrl,
    };

    try {
      const docRef = await addDoc(chastRef, newChat);

      await updateDoc(doc(db, "users", currentUser!.id), {
        chats: arrayUnion(docRef.id),
      });

      await updateDoc(doc(db, "users", contact.id), {
        chats: arrayUnion(docRef.id),
      });

      router.push(`/chat/${docRef.id}`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleClick = (contact: User) => {
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

    createNewChat(contact);
  };

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
