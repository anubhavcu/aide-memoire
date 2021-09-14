const initialState = 'light'; // true = light
export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'THEME_SWITCHED':
      return action.payload === true ? 'dark' : 'light';
    default:
      return state;
  }
};
