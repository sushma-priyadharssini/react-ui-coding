import { pagination } from "./pagination";
import { app } from "./app";

export const initialState = {
    pagination: {
        currentPage: 1
    },
    app: {
        currentProject: null
    }
};

export const rootReducer = (state, action) => ({
    pagination: pagination(state.pagination, action),
    app: app(state.app, action),
});