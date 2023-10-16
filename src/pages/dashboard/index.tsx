import React from "react";
import { NextPage } from "next";
import { Chats } from "./chats";
import { chats } from "@/mocks";
import { Layout } from "@/components/layout";

const Dashboard: NextPage = ({}) => {
  return (
    <Layout>
      <Chats chats={chats} />
    </Layout>
  );
};

export default Dashboard;
