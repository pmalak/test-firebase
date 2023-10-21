import React, { FC } from "react";
import { COLORS } from "@/constants/colors";
import styled from "styled-components";

type Props = {
  children: JSX.Element;
};
export const Layout: FC<Props> = ({ children }) => {
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
  max-width: 375px;
  height: 100%;
  max-height: 820px;
  background-color: ${COLORS.mainBg};
  box-shadow: 40px 40px 100px 0px rgba(24, 48, 63, 0.5);
  border-radius: 32px;
`;
