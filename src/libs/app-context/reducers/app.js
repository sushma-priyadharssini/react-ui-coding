export const app = (state, action) => {
    switch (action.type) {
        case 'SET_CURRENT_PROJECT':
            return {
                ...state,
                currentProject: action.payload
            };
        default:
            return state;
    }
}