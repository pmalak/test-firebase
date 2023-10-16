import React, { FC, ReactNode } from "react";


import { Box } from "@material-ui/core";
import { COLORS } from "@/constants/colors";
import styled from "styled-components";

type Props = {
  children: JSX.Element
}	
export const Layout: FC<Props> = ({ children }) => {
  return (
    <MainLayout>
      <MaxWidth>{children}</MaxWidth>
    </MainLayout>
  );
};

const MainLayout = styled.div`
  background-color: ${COLORS.mainBg};
  display: flex;
  justify-content: center;
  height: 100vh;
`;

const MaxWidth = styled.div`
  max-width: 375px;
  height: 100%;
`;
