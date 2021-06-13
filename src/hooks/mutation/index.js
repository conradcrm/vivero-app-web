import { useReducer } from "react";
import { notify } from "../../component/notification";

export const useFetch = (endpoint, module) => {
    let url = endpoint;
    const initialState = {
        status: "loading",
        error: null,
        data: [],
    };

    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "LOADING":
                return { ...initialState, status: "loading" };
            case "FETCHED":
                return { ...initialState, status: "fetched", data: action.payload };
            case "ERROR":
                return { ...initialState, status: "error", error: action.payload };
            default:
                return state;
        }
    }, initialState);

    if (!url) return;
    const fetchData = async (method, dataSend, setIsLoading) => {
        setIsLoading(true)
        dispatch({ type: "LOADING" });
        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "content-type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(dataSend),
            });
            const data = await response.json();
            dispatch({ type: "FETCHED", payload: data });
            //notify(data.status, data.message)
        } catch (error) {
            dispatch({ type: "ERROR", payload: error.message });
            notify("error", "Ha ocurrido un error, inténtelo más tarde.")
        }
        setIsLoading(false)
    };
    const newKeys = { data: "data" + module, status: "status" + module};
    const obj = renameKeys(state, newKeys);
    return [obj, fetchData];
};

function renameKeys(obj, newKeys) {
    const keyValues = Object.keys(obj).map(key => {
        const newKey = newKeys[key] || key;
        return { [newKey]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
}