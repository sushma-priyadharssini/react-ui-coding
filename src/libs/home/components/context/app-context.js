import { createContext, useReducer, useContext } from "react";
import { rootReducer, initialState } from "./reducers";
import { setPage } from "./actions/pagination";

const AppContext = createContext(null)
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);

    const dispatchers = {
        setPage: setPage(dispatch),
    }

    return (
        <AppContext.Provider value={{ pagination: state.pagination, dispatchers }}>
            {children}
        </AppContext.Provider>
    );
}