export const ADD_COLUMN = 'ADD_COLUMN';

export function addColumn(column) {
  return { type: ADD_COLUMN, column };
}
