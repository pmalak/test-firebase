import { Box, IconButton, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SendIcon from "@material-ui/icons/Send";
import { Message } from "@/types";
import { currentUser } from "@/mocks";
import {
  addDoc,
  collection,
  query,
  where,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import { useFirebaseContext } from "@/components/firebase-context";
import { useRouter } from "next/router";

type Props = {
  // setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

export const Input = ({  }: Props) => {
  const router = useRouter();
  const { chatId } = router.query;
  const { db } = useFirebaseContext();

  const docS = doc(db, "chats", chatId as string);

  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = async () => {
    if (value !== "") {
      const newMessage = {
        id: `${new Date()} ${value}`,
        author: currentUser,
        content: value,
        createdAt: new Date(),
      };

      const resp = await updateDoc(docS, {
        messages: arrayUnion(newMessage),
        lastMessage: newMessage,
      });

      setValue("");
    }
  };

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();

        handleSubmit();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [handleSubmit]);

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

      <IconButton aria-label="delete" onClick={handleSubmit}>
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
`;

const InputRow = styled.div`
  padding: 16px;
  display: grid;
  align-items: end;
  grid-gap: 8px;
  grid-template-columns: 1fr auto;
`;
