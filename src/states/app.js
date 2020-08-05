import produce from 'immer';

export const sealObject = (objDefault = {}, ...objValues) => {
  const objSealValue = Object.seal({ ...objDefault });

  objValues.forEach(objValue => {
    if (!objValue) return;
    Object.entries(objValue).forEach(([key, value]) => {
      try {
        objSealValue[key] = value;
      } catch (e) {
        console.error(e);
      }
    });
  });
  return objSealValue;
};

const DEFAULT_STATE = {
  layoutState: {
    menuMobileOpened: false,
    menuCollapsed: false,
  },
};

export default {
  name: 'app',
  state: {
    ...DEFAULT_STATE,
  },
  reducers: {
    setLayoutState: produce((state, param = {}) => {
      state.layoutState = { ...state.layoutState, ...param };
      window.localStorage.setItem('app.layoutState', JSON.stringify(state.layoutState));
      return state;
    }),
  },
  // effects: dispatch => ({

  // }),
};
