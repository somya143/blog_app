import { legacy_createStore , combineReducers , compose , applyMiddleware } from "redux"
import thunk from "redux-thunk";
import authReducer from "./auth/authReducer";

const rootReucer = combineReducers({
    auth: authReducer
});

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(rootReucer , createComposer(applyMiddleware(thunk)));