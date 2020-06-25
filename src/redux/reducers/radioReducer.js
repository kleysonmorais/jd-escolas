import * as ACTIONS from 'app/redux/actions/radioAction';

const RadioReducer = (state = { value: 1 }, action) => {
  switch (action.type) {
    case ACTIONS.RADIO_CHANGE_VALUE:
      return { value: action.value };
    default:
      return { ...state };
  }
};

export default RadioReducer;
