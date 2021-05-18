import { useEffect, useRef, useReducer } from "react";

export const useQuery = (endpoint, yes, module) => {
  const query = `http://localhost:8000/`;
  let url = `${query}${endpoint}`;
  const cache = useRef({});

  const initialState = {
    status: "loading",
    error: null,
    module: [],
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

  useEffect(() => {
    let cancelRequest = false;
    if (!url) return;

    const fetchData = async () => {
      dispatch({ type: "LOADING" });
      if (cache.current[url]) {
        const data = cache.current[url];
        dispatch({ type: "FETCHED", payload: data });
      } else {
        try {
          const response = await fetch(url);
          const data = await response.json();
          cache.current[url] = data;
          if (cancelRequest) return;
          dispatch({ type: "FETCHED", payload: data });
        } catch (error) {
          if (cancelRequest) return;
          dispatch({ type: "ERROR", payload: error.message });
        }
      }
    };

    fetchData();

    return function cleanup() {
      cancelRequest = true;
    };
  }, [url]);

  if (yes) {
    const newKeys = { data: "data"+module, status: "status"+module};
    const obj = renameKeys(state, newKeys);
    return obj
  }
  return state;
};

function renameKeys(obj, newKeys) {
  const keyValues = Object.keys(obj).map(key => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
}