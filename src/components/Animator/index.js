import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";

import SequencePreviewer from "./SequencePreviewer";
import useInterval from '../../hooks/useInterval';
import {
  appendAnimationStep,
  incrementAnimationStep,
  setColorForGridItem,
  setControlsExposed,
  setIsPlaying,
  setSelectedGridItem,
  uploadSequence,
} from "./actions";

const Animator = () => {
  const dispatch = useDispatch();
  const sequence = useSelector(state => state.animator.sequence);
  const selectedGridItem = useSelector(state => state.animator.selectedGridItem);
  const areControlsExposed = useSelector(state => state.animator.areControlsExposed);
  const animationStep = useSelector(state => state.animator.animationStep);
  const isPlaying = useSelector(state => state.animator.isPlaying);
  const rows = useSelector(state => state.animator.rows);
  const cols = useSelector(state => state.animator.cols);
  const connectedPositions = useSelector(state => state.animator.connectedPositions);

  useInterval(
    () => {
      if (sequence.length === 0) {
        return;
      }

      dispatch(incrementAnimationStep());
    },

    // TODO: Can set to null to stop the progression (useful for Pause button).
    isPlaying ? 1000 : null,
  );

  const getColorForGridItem = (row, col) => sequence[animationStep][row][col];

  const onToggleControls = () => dispatch(setControlsExposed(!areControlsExposed));

  const onClickGridItem = (row, col) => {
    dispatch(setSelectedGridItem({row, col}));
  };

  const onUpdateSelectedItemColor = (event) => {
    const color = event.target.value;
    dispatch(setColorForGridItem(color));
  };

  const onAppendStep = () => {
    dispatch(appendAnimationStep());
  };

  const onToggleIsPlaying = () => {
    dispatch(setIsPlaying(!isPlaying));
  };

  const onUploadSequence = () => dispatch(uploadSequence(sequence));

  return (
    <>
      <Animator.Container>
        <Animator.AnimationGridContainer>
          <Animator.AnimationGrid rows={rows} cols={cols}>
            {
              [...new Array(rows * cols)].map((_, idx) => {
                const row = Math.floor(idx / rows);
                const col = idx % cols;
                const positionText = `[${row}, ${col}]`;
                const isSelected = selectedGridItem.row === row && selectedGridItem.col === col;
                const isOnline = !!connectedPositions[`${row}-${col}`];

                return (
                  <Animator.AnimationGridItem
                    key={positionText}
                    color={getColorForGridItem(row, col)}
                    isSelected={isSelected} 
                    onClick={() => onClickGridItem(row, col)}
                  >
                    <span>{positionText}</span>
                    <Animator.AnimationGridItemOnlineStatus isOnline={isOnline} />
                  </Animator.AnimationGridItem>
                );
              })
            }
          </Animator.AnimationGrid>
          <Animator.StepPreviewContainer>
            <SequencePreviewer />
          </Animator.StepPreviewContainer>
        </Animator.AnimationGridContainer>
      </Animator.Container>
      <Animator.ControlsPanel>
        <Animator.ControlsHeader>
          <span>Controls</span>
          <Animator.ControlsHeaderButton onClick={onToggleControls}>
            {areControlsExposed ? '–' : '+'}
          </Animator.ControlsHeaderButton>
        </Animator.ControlsHeader>
        <Animator.ControlsContent isExposed={areControlsExposed}>
          {selectedGridItem.row !== undefined && selectedGridItem.col !== undefined && (
            <Animator.ControlPanelSection>
              <Animator.ControlRow>
                <Animator.ControlLabel>{`Placeholder Test`}</Animator.ControlLabel>
                <Animator.Input
                  type="color"
                  autoComplete="off"
                  value={getColorForGridItem(selectedGridItem.row, selectedGridItem.col)}
                  onChange={onUpdateSelectedItemColor}
                />
              </Animator.ControlRow>
            </Animator.ControlPanelSection>
          )}
          <Animator.ControlPanelSection>
            <Animator.ControlRow>
              <Animator.ControlLabel>{`Add Steps`}</Animator.ControlLabel>
              <Animator.Button onClick={onAppendStep}>
                Add New Step
              </Animator.Button>
            </Animator.ControlRow>
          </Animator.ControlPanelSection>
          <Animator.ControlPanelSection>
            <Animator.ControlRow>
              <Animator.ControlLabel>{`View Animation`}</Animator.ControlLabel>
              <Animator.Button onClick={onToggleIsPlaying}>
                {isPlaying ? "Pause" : "Play"}
              </Animator.Button>
            </Animator.ControlRow>
          </Animator.ControlPanelSection>
          <Animator.ControlPanelSection>
            <Animator.ControlRow>
              <Animator.ControlLabel>{`Server Interaction`}</Animator.ControlLabel>
              <Animator.Button onClick={onUploadSequence}>
                Upload Sequence
              </Animator.Button>
            </Animator.ControlRow>
          </Animator.ControlPanelSection>
        </Animator.ControlsContent>
      </Animator.ControlsPanel>
    </>
  );
};

Animator.Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

Animator.AnimationGridContainer = styled.div`
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

Animator.AnimationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${p => p.cols ? p.cols : 1}, 1fr);
  grid-template-rows: repeat(${p => p.rows ? p.rows : 1}, 1fr);
  grid-gap: 1rem;
  height: 100%;
  width: 100%;
`;

Animator.AnimationGridItem = styled.button`
  border: 1px solid ${p => p.isSelected ? "red": "white"};
  background: ${p => p.color};
  position: relative;
  
  span {
    color: white;
    mix-blend-mode: difference;
  }
`;

Animator.AnimationGridItemOnlineStatus = styled.div`
  border-radius: 50%;
  border: 1px solid white;
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${p => p.isOnline ? '#2ecc71': 'none'};
`;

// TODO: The following should be moved to system.

Animator.ControlsPanel = styled.div`
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

 Animator.ControlsHeader = styled.div`
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

 Animator.ControlsHeaderButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  color: white;
  font-size: 1rem;
  font-weight: bold;
`;

Animator.ControlsContent = styled.div`
  display: ${(p) => (p.isExposed ? 'block' : 'none')};
  overflow-y: scroll;
`;

Animator.ControlPanelSection = styled.div`
  padding: 0.5rem;
`;

Animator.ControlRow = styled.div`
  display: flex;
  font-size: 0.75rem;
  flex-direction: column;
  margin: 0.5rem 0;

  :last-child {
    margin-bottom: 0;
  }
`;

Animator.ControlLabel = styled.div`
  margin-bottom: 0.5rem;
`;

Animator.Input = styled.input`
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

Animator.Button = styled.button`
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

Animator.StepPreviewContainer = styled.div`
  position: absolute;
  top: 0;
  left: -1rem;
  transform: translateX(-100%);
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
`;

export default Animator;
