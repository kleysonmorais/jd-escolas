import { combineReducers } from 'redux';
import RadioReducer from './radioReducer';

const rootReducer = combineReducers({
  radio: RadioReducer,
});

export default rootReducer;
