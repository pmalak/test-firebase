import React from "react";
import { NextPage } from "next";
import { Chats } from "./components/chats";
import { chatsMock } from "@/mocks";
import { Layout } from "@/components/layout";
import { Typography } from "@material-ui/core";

const Dashboard: NextPage = ({}) => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Header
      </Typography>

      <Chats chats={chatsMock} />
    </>
  );
};

export default Dashboard;
