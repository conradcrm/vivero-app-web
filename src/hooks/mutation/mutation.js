const globalQuery = "http://localhost:8000/api/";
const headers = {
    "content-type": "application/json",
    Accept: "application/json",
}

export const updateStatusItem = async ({id,endpoint}) => {
    const url = `${globalQuery}${endpoint}/${id}`;
    const response = await fetch(url, {
        method: "PATCH",
        headers:headers,
    });
    const resp = await response.json();
    return resp;
};


export const updateItem = async ({id,data,endpoint}) => {
    const url = `${globalQuery}${endpoint}/${id}`;
    const response = await fetch(url, {
        method: "PATCH",
        headers:headers,
        body: JSON.stringify(data),
    });
    const resp = await response.json();
    return resp;
};
