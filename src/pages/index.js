import React, { useEffect } from "react";
import styled from "styled-components";
import { io } from "socket.io-client";

import Layout from "../components/layout";
import Seo from "../components/seo";

const socket = io("http://localhost:3000");

const IndexPage = ({ location }) => {
  const params = new URLSearchParams(location.search);
  const rowIndex = params.get("r");
  const colIndex = params.get("c");

  useEffect(() => {
    console.log("Use effect", socket);
  }, []);

  socket.on("connect", () => {
    socket.emit("connectedPosition", {row: rowIndex, col: colIndex});
  });

  return (
    <Layout>
      <Seo title="Home" />
      <IndexPage.ColorBackground bgColor="green">
        <IndexPage.PositionDetails>
          <p>{`Row: ${rowIndex}, Col: ${colIndex}`}</p>
        </IndexPage.PositionDetails>
      </IndexPage.ColorBackground>
    </Layout>
  );
}

IndexPage.ColorBackground = styled.div`
  flex: 1;
  background: ${p => p.bgColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
`;

IndexPage.PositionDetails = styled.div`
  color: white;
  mix-blend-mode: difference;
`;

export default IndexPage;
