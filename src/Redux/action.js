import {
  ADD_GROUP,
  REMOVE_GROUP,
  UPDATE_GROUP,
  SET_STATUSES,
} from "./actionTypes";

export const addGroup = (group) => ({
  type: ADD_GROUP,
  group,
});

export const removeGroup = (index) => ({
  type: REMOVE_GROUP,
  index,
});

export const updateGroup = (index, group) => ({
  type: UPDATE_GROUP,
  index,
  group,
});

export const setStatuses = (groupIndex, statuses) => ({
  type: SET_STATUSES,
  groupIndex,
  statuses,
});
