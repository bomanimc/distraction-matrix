import axios from 'axios';

export const SET_SEQUENCE = 'animator/SET_SEQUENCE';
export const setSequence = sequence => async dispatch => {
  await dispatch({
    type: SET_SEQUENCE,
    sequence,
  });
};

export const SET_COLOR_FOR_GRID_ITEM = 'animator/SET_COLOR_FOR_GRID_ITEM';
export const setColorForGridItem = color => async dispatch => {
  await dispatch({
    type: SET_COLOR_FOR_GRID_ITEM,
    color,
  });
};

export const SET_ANIMATION_STEP = 'animator/SET_ANIMATION_STEP';
export const setAnimationStep = step => async dispatch => {
  await dispatch({
    type: SET_ANIMATION_STEP,
    step,
  });
};

export const APPEND_ANIMATION_STEP = 'animator/APPEND_ANIMATION_STEP';
export const appendAnimationStep = () => async dispatch => {
  await dispatch({
    type: APPEND_ANIMATION_STEP,
  });
};

export const INCREMENT_ANIMATION_STEP = 'animator/INCREMENT_ANIMATION_STEP';
export const incrementAnimationStep = () => async dispatch => {
  await dispatch({
    type: INCREMENT_ANIMATION_STEP,
  });
};

export const SET_CONTROLS_EXPOSED = 'animator/SET_CONTROLS_EXPOSED';
export const setControlsExposed = areExposed => async dispatch => {
  await dispatch({
    type: SET_CONTROLS_EXPOSED,
    areExposed,
  });
};

export const SET_SELECTED_GRID_ITEM = 'animator/SET_SELECTED_GRID_ITEM';
export const setSelectedGridItem = gridItem => async dispatch => {
  await dispatch({
    type: SET_SELECTED_GRID_ITEM,
    gridItem,
  });
};

export const SET_IS_PLAYING = 'animator/SET_IS_PLAYING';
export const setIsPlaying = isPlaying => async dispatch => {
  await dispatch({
    type: SET_IS_PLAYING,
    isPlaying,
  });
};

export const UPLOAD_SEQUENCE = 'animator/UPLOAD_SEQUENCE';
export const uploadSequence = sequence => async dispatch => {
  axios.post('http://localhost:3000/api/upload', {
    data: {
      sequence,
    },
  })
  .then((response) =>  {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
};