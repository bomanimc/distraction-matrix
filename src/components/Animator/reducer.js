import cloneDeep from "lodash.clonedeep";

import * as actions from './actions';
import initialState from '../../state/initial';

export default (state = initialState.animator, action) => {
  switch (action.type) {
    case actions.SET_SEQUENCE: {
      return {
        ...state,
        sequence: action.sequence,
      };
    }
    case actions.SET_COLOR_FOR_GRID_ITEM: {
      const { sequence } = state;
      const newSequence = cloneDeep(sequence);
      const {animationStep, selectedGridItem} = state;
      newSequence[animationStep][selectedGridItem.row][selectedGridItem.col] = action.color;

      return {
        ...state,
        sequence: newSequence,
      }
    }
    case actions.SET_CONTROLS_EXPOSED: {
      return {
        ...state,
        areControlsExposed: action.areExposed,
      };
    }
    case actions.SET_ANIMATION_STEP: {
      return {
        ...state,
        animationStep: action.step,
      };
    }
    case actions.APPEND_ANIMATION_STEP: {
      const { sequence } = state;
      // Copy the content of the last step into the new step.
      const newSequence = [...cloneDeep(sequence), cloneDeep(sequence[sequence.length - 1])];

      return {
        ...state,
        animationStep: newSequence.length - 1,
        sequence: newSequence,
      }
    }
    case actions.SET_SELECTED_GRID_ITEM: {
      return {
        ...state,
        selectedGridItem: {...action.gridItem},
        areControlsExposed: true,
      };
    }
    default:
      return state;
  }
};
