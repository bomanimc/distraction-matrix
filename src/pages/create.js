import React from "react";
import { useDispatch } from 'react-redux';
import { io } from "socket.io-client";

import Layout from "../components/layout";
import Seo from "../components/seo";
import Animator from "../components/Animator";
import { setConnectedPositions } from "../components/Animator/actions";

const socket = io(process.env.GATSBY_SOCKET_SERVER_URL);

const CreatePage = () => {
  const dispatch = useDispatch();

  socket.once("connect", () => {
    console.log("Animator connected!");
    socket.emit("connectAnimator");
  });

  socket.on("connectedPositions", (data) => {
    dispatch(setConnectedPositions(data.connectedPositions));
  });

  return (
    <Layout>
      <Seo title="Create" />
      <Animator />
    </Layout>
  );
};

export default CreatePage;
