import { pagination } from "./pagination";

export const initialState = {
    pagination: {
        page: {
            currPage: 1,
            endPage: 1
        }
    }
};

export const rootReducer = (state, action) => ({
    pagination: pagination(state.pagination, action)
});