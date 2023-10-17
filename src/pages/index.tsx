import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Box, Button, Typography } from "@material-ui/core";
import { Layout } from "@/components/layout";
import styled from "styled-components";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div>
        <Head>
          <title>Chat App</title>∏
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Wrapper>
          <img
            src="https://crystallize.com/static/logo/crystallize-logo.svg"
            alt=""
          />
          <Typography variant="h2" >Chat</Typography>

          <Link href="/dashboard">
            <Button>Login</Button>
          </Link>
        </Wrapper>
      </div>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
