import { IconButton, TextField } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import SendIcon from "@material-ui/icons/Send";

import { updateDoc, doc, arrayUnion, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import db from "@/utils/firebase";
import { useUserContext } from "@/components/user-context";
import { Chat } from "@/types";
import { v4 as uuidv4 } from "uuid";


export const Input = () => {
  const router = useRouter();
  const { chatId } = router.query;
  const { currentUser } = useUserContext();

  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const submitMessage = useCallback(async () => {
    if (value !== "") {
      const newMessage = {
        id: uuidv4(),
        author: currentUser,
        content: value,
        createdAt: new Date(),
      };

      const selectedDoc = doc(db, "chats", chatId as string);
      await updateDoc(selectedDoc, {
        messages: arrayUnion(newMessage),
        lastMessage: newMessage,
      });

      setValue("");
    }
  }, [chatId, currentUser, value]);

  const createNewChat = useCallback(async () => {
    const contactId = localStorage.getItem("newChatParticipant");

    const newChat: Omit<Chat, "id"> = {
      messages: [],
      lastMessage: null,
      members: [currentUser!.id, contactId as string],
      chatName: contactId as string,
    };

    try {
      const docRef = await setDoc(doc(db, "chats", chatId as string), newChat);

      await updateDoc(doc(db, "users", currentUser!.id), {
        chats: arrayUnion(chatId),
      });

      await updateDoc(doc(db, "users", contactId as string), {
        chats: arrayUnion(chatId),
      });
      return docRef;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }, [chatId, currentUser]);

  const handleSend = useCallback(async () => {
    if (!currentUser?.chats.includes(chatId as string)) {
      await createNewChat();

      submitMessage();
      return;
    }

    submitMessage();
  }, [chatId, createNewChat, currentUser?.chats, submitMessage]);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();

        handleSend();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [handleSend]);

  return (
    <InputRow>
      <TheThing
        multiline
        fullWidth
        maxRows={4}
        value={value}
        onChange={handleChange}
        variant="outlined"
      />

      <IconButton aria-label="delete" onClick={handleSend}>
        <SendIcon />
      </IconButton>
    </InputRow>
  );
};

const TheThing = styled(TextField)`
  background-color: rgba(0, 0, 0, 0.25);

  textarea {
    color: white;
  }

  .MuiOutlinedInput-multiline {
    padding: 14px;
  }
`;

const InputRow = styled.div`
  padding: 16px;
  display: grid;
  align-items: end;
  grid-gap: 8px;
  grid-template-columns: 1fr auto;
`;
