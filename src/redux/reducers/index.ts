import { combineReducers } from 'redux';
import boardReducer from './board';
import toolsReducer from './tools';
import modalsReducer from './modals';

export default combineReducers({
    board: boardReducer,
    tools: toolsReducer,
    modals: modalsReducer
});
