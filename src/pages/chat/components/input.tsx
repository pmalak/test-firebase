import { Box, IconButton, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SendIcon from "@material-ui/icons/Send";
import { Message } from "@/types";
import { currentUser } from "@/mocks";

type Props = {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

export const Input = ({ setMessages }: Props) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  console.log("value", value);

  const handleSubmit = () => {
    if (value !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: "ss",
          author: currentUser,
          content: value,
          createdAt: new Date(),
        },
      ]);

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
