export const pagination = (state, action) => {
    switch (action.type) {
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.payload
            };
        case 'SET_NEXT_PAGE':
            return {
                ...state,
                currentPage: state.currentPage + 1
            };
        case 'SET_PREV_PAGE':
            return {
                ...state.page,
                currentPage: state.currentPage - 1
            };
        default:
            return state;
    }
}