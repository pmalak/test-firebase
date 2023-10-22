import { IconButton, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SendIcon from "@material-ui/icons/Send";

import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { useRouter } from "next/router";
import db from "@/utils/firebase";
import { useUserContext } from "@/components/user-context";

export const Input = () => {
  const router = useRouter();
  const { chatId } = router.query;
  const { currentUser } = useUserContext();

  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const submitMessage = async () => {
    if (value !== "") {
      const newMessage = {
        id: `${new Date()} ${value}`,
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
  };

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();

        submitMessage();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [submitMessage]);

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

      <IconButton aria-label="delete" onClick={submitMessage}>
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
    padding: 14px
  }
`;

const InputRow = styled.div`
  padding: 16px;
  display: grid;
  align-items: end;
  grid-gap: 8px;
  grid-template-columns: 1fr auto;
`;
