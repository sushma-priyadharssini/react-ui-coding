"use client";

import { createContext, useReducer, useContext } from "react";
import { rootReducer, initialState } from "./reducers";
import { setPage } from "./actions/pagination";
import { setCurrentProject } from "./actions/app";

const AppContext = createContext(null)
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);

    const dispatchers = {
        setPage: setPage(dispatch),
        setCurrentProject: setCurrentProject(dispatch)
    }

    return (
        <AppContext.Provider value={{
            pagination: state.pagination,
            app: state.app,
            dispatchers
        }}>
            {children}
        </AppContext.Provider>
    );
}