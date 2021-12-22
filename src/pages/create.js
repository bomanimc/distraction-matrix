import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Layout from "../components/layout";
import Seo from "../components/seo";

const CreatePage = () => {
  const [areControlsExposed, setAreControlsExposed] = useState(true);

  const onToggleControls = () => setAreControlsExposed(!areControlsExposed);

  const rows = 5;
  const cols = 5;

  return (
    <Layout>
      <Seo title="Create" />
      <CreatePage.Container>
        <CreatePage.AnimationGrid rows={rows} cols={cols}>
          {
            [...new Array(rows * cols)].map((_, idx) => (
              <p>{`[${Math.floor(idx / rows)}, ${idx % cols}]`}</p>
            ))
          }
        </CreatePage.AnimationGrid>
      </CreatePage.Container>
      <CreatePage.ControlsPanel>
        <CreatePage.ControlsHeader>
          <span>Controls</span>
          <CreatePage.ControlsHeaderButton onClick={onToggleControls}>
            {areControlsExposed ? '–' : '+'}
          </CreatePage.ControlsHeaderButton>
        </CreatePage.ControlsHeader>
      </CreatePage.ControlsPanel>
    </Layout>
  );
};

CreatePage.Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

CreatePage.AnimationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${p => p.cols ? p.cols : 1}, 1fr);
  grid-template-rows: repeat(${p => p.rows ? p.rows : 1}, 1fr);
  grid-gap: 1rem;
  padding: .25rem;

  @media screen and (orientation: landscape) {
    height: ${(p) => (p.smallMode ? '80vh' : '100vh')};
    width: ${(p) => (p.smallMode ? '80vh' : '100vh')};;
  }

  @media screen and (orientation: portrait) {
    height: ${(p) => (p.smallMode ? '80vw' : '100vw')};;
    width: ${(p) => (p.smallMode ? '80vw' : '100vw')};;
  }
`;

// TODO: The following should be moved to system.

CreatePage.ControlsPanel = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  border: 1px solid white;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 15rem;
  background: black;
  opacity: 0.8;

  @media (max-width: 896px) {
    width: unset;
    left: 1rem;
    top: ${(p) => (p.isExposed ? '8rem' : 'unset')};;
  }
`;

 CreatePage.ControlsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: bold;
  border-bottom: 1px solid white;
  flex: 1;
  background: rgba(0, 0, 255, .37);
`;

 CreatePage.ControlsHeaderButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  color: white;
  font-size: 1rem;
  font-weight: bold;
`;

export default CreatePage;
