import React, { useState } from "react";
import styled from "styled-components";

const SequencePreviewer = ({ sequence, selectedStepIndex, onSelectStep }) => {
  if (!sequence) {
    return null;
  }

  const rows = sequence[0].length;
  const cols = sequence[0][0].length;

  return sequence.map((step, idx) => {
    return (
      <SequencePreviewer.Preview 
        rows={rows}
        cols={cols} 
        isSelected={selectedStepIndex === idx}
        onClick={() => onSelectStep(idx)}
      >
        {
          [...new Array(rows * cols)].map((_, idx) => {
            const row = Math.floor(idx / rows);
            const col = idx % cols;

            return (
              <SequencePreviewer.GridItem
                key={`[${row}, ${col}]`}
                color={step[row][col]}
              />
            );
          })
        }
      </SequencePreviewer.Preview>);
  });
};

SequencePreviewer.Preview = styled.div`
  border: 1px solid ${p => p.isSelected ? "red": "white"};
  height: 60px;
  width: 60px;
  display: grid;
  grid-template-columns: repeat(${p => p.cols ? p.cols : 1}, 1fr);
  grid-template-rows: repeat(${p => p.rows ? p.rows : 1}, 1fr);
`;

SequencePreviewer.GridItem = styled.div.attrs(props => ({
  style: {
    background: props.color,
  },
}))``;

export default SequencePreviewer;