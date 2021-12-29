const defaultDimensions = {rows: 3, cols: 3};

const createEmptyMatrix = (rows, cols) => [...new Array(rows)].map(() => new Array(cols).fill('#000'));

export default {
  animator: {
    ...defaultDimensions,
    areControlsExposed: true,
    connectedPositions: {},
    isPlaying: false,
    sequence: [createEmptyMatrix(defaultDimensions.rows, defaultDimensions.cols)],
    selectedGridItem: {row: undefined, col: undefined},
    animationStep: 0,
  },
};
