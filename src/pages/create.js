import React, { useState } from "react";
import styled from "styled-components";
import cloneDeep from "lodash.clonedeep";

import Layout from "../components/layout";
import Seo from "../components/seo";
import SequencePreviewer from "../components/SequencePreviewer";

const CreatePage = () => {
  const rows = 3;
  const cols = 3;

  const createEmptyMatrix = (rows, cols) => [...new Array(rows)].map(() => new Array(cols));
  
  const getColorForGridItem = (row, col) => sequence[animationStep][row][col];

  const [animationStep, setAnimationStep] = useState(0);

  const setColorForGridItem = (row, col, color) => {
    const newSequence = cloneDeep(sequence);
    newSequence[animationStep][row][col] = color;
    setSequence(newSequence);
  };

  const [areControlsExposed, setAreControlsExposed] = useState(true);

  const [sequence, setSequence] = useState([createEmptyMatrix(rows, cols)]);

  const [selectedGridItem, setSelectedGridItem] = useState({row: undefined, col: undefined});

  const onToggleControls = () => setAreControlsExposed(!areControlsExposed);

  const onClickGridItem = (row, col) => {
    console.log(row, col);
    setAreControlsExposed(true);
    setSelectedGridItem({row, col});
  };

  const onUpdateSelectedItemColor = (event) => {
    const color = event.target.value;
    const {row: selectedRow, col: selectedCol} = selectedGridItem;
    setColorForGridItem(selectedRow, selectedCol, color);
  };

  const onAppendStep = () => {
    // Copy the content of the last step into the new step.
    const newSequence = [...cloneDeep(sequence), cloneDeep(sequence[sequence.length - 1])];
    setSequence(newSequence);
    setAnimationStep(newSequence.length - 1);
  };

  const onSelectStep = (stepIndex) => {
    setAnimationStep(stepIndex);
  };

  return (
    <Layout>
      <Seo title="Create" />
      <CreatePage.Container>
        <CreatePage.AnimationGridContainer>
          <CreatePage.AnimationGrid rows={rows} cols={cols}>
            {
              [...new Array(rows * cols)].map((_, idx) => {
                const row = Math.floor(idx / rows);
                const col = idx % cols;
                const positionText = `[${row}, ${col}]`;
                const isSelected = selectedGridItem.row === row && selectedGridItem.col === col;

                return (
                  <CreatePage.AnimationGridItem
                    key={positionText}
                    color={getColorForGridItem(row, col)}
                    isSelected={isSelected} 
                    onClick={() => onClickGridItem(row, col)}
                  >
                    <span>{positionText}</span>
                  </CreatePage.AnimationGridItem>
                );
              })
            }
          </CreatePage.AnimationGrid>
          <CreatePage.StepPreviewContainer>
            <SequencePreviewer
              sequence={sequence}
              selectedStepIndex={animationStep}
              onSelectStep={onSelectStep}
            />
          </CreatePage.StepPreviewContainer>
        </CreatePage.AnimationGridContainer>
      </CreatePage.Container>
      <CreatePage.ControlsPanel>
        <CreatePage.ControlsHeader>
          <span>Controls</span>
          <CreatePage.ControlsHeaderButton onClick={onToggleControls}>
            {areControlsExposed ? '–' : '+'}
          </CreatePage.ControlsHeaderButton>
        </CreatePage.ControlsHeader>
        <CreatePage.ControlsContent isExposed={areControlsExposed}>
          {selectedGridItem.row !== undefined && selectedGridItem.col !== undefined && (
            <CreatePage.ControlPanelSection>
              <CreatePage.ControlRow>
                <CreatePage.ControlLabel>{`Placeholder Test`}</CreatePage.ControlLabel>
                <CreatePage.Input
                  type="color"
                  autoComplete="off"
                  value={getColorForGridItem(selectedGridItem.row, selectedGridItem.col)}
                  onChange={onUpdateSelectedItemColor}
                />
              </CreatePage.ControlRow>
            </CreatePage.ControlPanelSection>
          )}
          <CreatePage.ControlPanelSection>
            <CreatePage.ControlRow>
              <CreatePage.ControlLabel>{`Add Steps`}</CreatePage.ControlLabel>
              <CreatePage.Button onClick={onAppendStep}>
                Add New Step
              </CreatePage.Button>
            </CreatePage.ControlRow>
          </CreatePage.ControlPanelSection>
        </CreatePage.ControlsContent>
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

CreatePage.AnimationGridContainer = styled.div`
  position: relative;

  @media screen and (orientation: landscape) {
    height: ${(p) => (p.smallMode ? '80vh' : '80vh')};
    width: ${(p) => (p.smallMode ? '80vh' : '80vh')};;
  }

  @media screen and (orientation: portrait) {
    height: ${(p) => (p.smallMode ? '80vw' : '90vw')};;
    width: ${(p) => (p.smallMode ? '80vw' : '90vw')};;
  }
`;

CreatePage.AnimationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${p => p.cols ? p.cols : 1}, 1fr);
  grid-template-rows: repeat(${p => p.rows ? p.rows : 1}, 1fr);
  grid-gap: 1rem;
  height: 100%;
  width: 100%;
`;

CreatePage.AnimationGridItem = styled.button`
  border: 1px solid ${p => p.isSelected ? "red": "white"};
  background: ${p => p.color};
  
  span {
    color: white;
    mix-blend-mode: difference;
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

CreatePage.ControlsContent = styled.div`
  display: ${(p) => (p.isExposed ? 'block' : 'none')};
  overflow-y: scroll;
`;

CreatePage.ControlPanelSection = styled.div`
  padding: 0.5rem;
`;

CreatePage.ControlRow = styled.div`
  display: flex;
  font-size: 0.75rem;
  flex-direction: column;
  margin: 0.5rem 0;

  :last-child {
    margin-bottom: 0;
  }
`;

CreatePage.ControlLabel = styled.div`
  margin-bottom: 0.5rem;
`;

CreatePage.Input = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background: transparent;
  outline: none;
  padding: 0.5rem;
  text-align: center;
  border: 1px solid white;
  border-radius: 0;
`;

CreatePage.Button = styled.button`
  background: ${(p) => (p.isSelected ? 'rgba(0, 0, 255, 0.37)' : 'none')};
  color: white;
  text-transform: capitalize;
  border: 1px solid white;
  padding: 0.5rem;
  width: 100%;

  &:disabled {
    color: rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.5);
  }
`;

CreatePage.StepPreviewContainer = styled.div`
  position: absolute;
  top: 0;
  left: -1rem;
  transform: translateX(-100%);
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
`;

export default CreatePage;
