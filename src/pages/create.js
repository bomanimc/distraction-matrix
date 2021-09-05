import React, { useEffect } from "react";
import styled from "styled-components";
import { io } from "socket.io-client";

import Layout from "../components/layout";
import Seo from "../components/seo";

const CreatePage = () => {
  return (
    <Layout>
      <Seo title="Create" />
    </Layout>
  );
};

export default CreatePage;
