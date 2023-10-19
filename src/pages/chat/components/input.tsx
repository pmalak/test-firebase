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
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

export const Input = ({ setMessages }: Props) => {
  const router = useRouter();
  const { chatId } = router.query;
  const { db } = useFirebaseContext();
  console.log("chatId be chastRef ", chatId);



  const docS = doc(db, "chats", chatId as string);


  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  console.log("value", value);

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

      // console.log("rest", resp)

      // setMessages((prevMessages) => [
      //   ...prevMessages,
      //   {
      //     id: "ss",
      //     author: currentUser,
      //     content: value,
      //     createdAt: new Date(),
      //   },
      // ]);

      setValue("");
    }
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      console.log("User pressed: ", event.key);

      if (event.key === "Enter") {
        event.preventDefault();

        // 👇️ your logic here
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
