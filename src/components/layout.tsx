import React, { FC, ReactNode } from "react";

import { Box } from "@material-ui/core";
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
  display: flex;
  justify-content: center;
  height: 100vh;
`;

const MaxWidth = styled.div`
  width: 100%;
  max-width: 375px;
  height: 100%;
  background-color: ${COLORS.mainBg};
  box-shadow: 40px 40px 100px 0px rgba(24, 48, 63, 0.5);
  padding: 2.5rem 0
`;
