import React from "react";
import { COLORS } from "@/constants/colors";
import styled from "styled-components";

type Props = {
  children: JSX.Element;
};
export const Layout = ({ children }: Props) => {
  return (
    <MainLayout>
      <MaxWidth>{children}</MaxWidth>
    </MainLayout>
  );
};

const MainLayout = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`;

const MaxWidth = styled.div`
  padding: 24px 0;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  background-color: ${COLORS.mainBg};
  box-shadow: 40px 40px 100px 0px rgba(24, 48, 63, 0.5);

  @media (min-width: 450px) {
    max-height: 720px;
    max-width: 375px;
    border-radius: 32px;
  }
`;
