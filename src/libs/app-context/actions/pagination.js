export const setCurrentPage = (dispatch) => (payload) =>
    dispatch({
        type: "SET_CURRENT_PAGE",
        payload,
    });

export const goToNextPage = (dispatch) => (payload) =>
    dispatch({
        type: "SET_NEXT_PAGE",
        payload,
    });

export const goToPrevPage = (dispatch) => (payload) =>
    dispatch({
        type: "SET_PREV_PAGE",
        payload,
    });