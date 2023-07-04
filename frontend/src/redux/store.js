import { legacy_createStore , combineReducers , compose , applyMiddleware } from "redux"
import thunk from "redux-thunk";
import authReducer from "./auth/authReducer";
import blogReducer from "./blog/blogReducer";

const rootReucer = combineReducers({
    auth: authReducer,
    blogs: blogReducer
});

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(rootReucer , createComposer(applyMiddleware(thunk)));