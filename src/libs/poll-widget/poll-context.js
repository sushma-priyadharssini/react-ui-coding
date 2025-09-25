
import { useReducer, useContext, createContext } from "react";

// 1. Create Context
const PollContext = createContext(null);


// 2. Define reducer
const initialState = {
    pollData: {
        lastUpdated: null,
        totalVotes: 0,
        question: 'Poll Title',
        options: [],
    },
    selectedOptions: [],
};

function pollReducer(state, action) {
    switch (action.type) {
        case "SET_POLL_DATA":
            return { ...state, pollData: action.payload };
        case "SET_SELECTED_OPTIONS":
            return { ...state, selectedOptions: action.payload };
        default:
            return state;
    }
}

// 3. Provider component
export function PollContextProvider({ children }) {
    const [state, dispatch] = useReducer(pollReducer, initialState);

    // helper functions
    const dispatchers = {
        setPollData: (val) => dispatch({ type: "SET_POLL_DATA", payload: val }),
        setSelectedOptions: (val) => dispatch({ type: "SET_SELECTED_OPTIONS", payload: val }),
    }

    return (
        <PollContext.Provider value={{ state, dispatchers }}>
            {children}
        </PollContext.Provider>
    );
}

// 4. Custom hook for easy usage
export const usePollContext = () => useContext(PollContext)