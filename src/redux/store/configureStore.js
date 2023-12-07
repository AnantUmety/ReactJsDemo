import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { HYDRATE, createWrapper } from "next-redux-wrapper";

// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
const bindMiddleware = (middleware) => {
  if (process.env.NEXT_PUBLIC_NODE_ENV !== "production") {
    return composeWithDevTools(applyMiddleware(...middleware));
  } else {
    return applyMiddleware(...middleware);
  }
};
const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

export const store = createStore(reducer, bindMiddleware([thunk]));

const initStore = () => {
  return store;
};

export const wrapper = createWrapper(initStore);
