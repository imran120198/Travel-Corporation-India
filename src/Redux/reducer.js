import {
  ADD_GROUP,
  REMOVE_GROUP,
  UPDATE_GROUP,
  SET_STATUSES,
} from "./actionTypes";

const initialState = {
  groups: [{ from: 1, to: 2 }],
  statuses: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GROUP:
      return {
        ...state,
        groups: [...state.groups, action.group],
      };
    case REMOVE_GROUP:
      return {
        ...state,
        groups: state.groups.filter((_, i) => i !== action.index),
      };
    case UPDATE_GROUP:
      return {
        ...state,
        groups: state.groups.map((group, i) =>
          i === action.index ? action.group : group
        ),
      };
    case SET_STATUSES:
      return {
        ...state,
        statuses: {
          ...state.statuses,
          [action.groupIndex]: action.statuses,
        },
      };
    default:
      return state;
  }
};
