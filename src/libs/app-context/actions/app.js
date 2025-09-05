export const setCurrentProject = (dispatch) => (payload) =>
    dispatch({
        type: "SET_CURRENT_PROJECT",
        payload,
    });