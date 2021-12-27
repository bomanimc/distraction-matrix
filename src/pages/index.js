import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { io } from "socket.io-client";

import Layout from "../components/layout";
import Seo from "../components/seo";

const socket = io("http://localhost:3000");

const IndexPage = ({ location }) => {
  const [color, setColor] = useState(undefined);

  const params = new URLSearchParams(location.search);
  const rowIndex = parseInt(params.get("r"));
  const colIndex = parseInt(params.get("c"));

  const onDisconnect = () => {
    socket.off('newFrame');
    socket.emit("disconnectedPosition", {row: rowIndex, col: colIndex});
    socket.disconnect();
  }

  useEffect(() => {
    console.log("Use effect", socket);
    window.addEventListener('beforeunload', onDisconnect);

    return () => {
      window.removeEventListener('beforeunload', onDisconnect);
    };
  }, []);

  socket.once("connect", () => {
    console.log("Connected!");
    socket.emit("connectedPosition", {row: rowIndex, col: colIndex});
  });

  socket.once("newFrame", (data) => {
    const { frame } = data;

    console.log(frame[rowIndex][colIndex]);
    console.log(rowIndex);

    if (frame) {
      setColor(frame[rowIndex][colIndex]);
    }
  });

  return (
    <Layout>
      <Seo title="Home" />
      <IndexPage.ColorBackground bgColor={color}>
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
